import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { delay, filter, map, mergeScan, Observable, of, Subscription, switchMap } from 'rxjs';
import { PasswordApi } from '../api/password.api';
import { PasswordCreateDialog } from '../components/password/password-view/password-view.component';
import { Password, PasswordType } from '../models/password.interface';
import { CryptoService } from '../services/crypto.service';

import { ToastService } from '../services/toast.service';
import { StateStore } from '../states/store.state';
import { ConfirmDialogComponent } from '../ui-elements/confirm-dialog/confirm-dialog.component';
import { UserController } from './user.controller';
import { VaultController } from './vault.controller';

@Injectable({
  providedIn: 'root',
})
export class PasswordController {
  subs: Subscription[] = [];
  entity: string = 'password';
  constructor(
    private store: StateStore,
    private passwordApi: PasswordApi,
    private userCtrl: UserController,
    private vaultCtrl: VaultController,
    private clipboardApi: ClipboardService,
    private toastService: ToastService,
    private crypt: CryptoService,
    public dialog: MatDialog
  ) {}

  load(): void {
    this.subs.push(
      this.passwordApi.readAll(this.userCtrl.uid).subscribe((passwords) => {
        this.store.setState(this.entity + '_list', passwords);
      })
    );
  }

  getPasswords$(type: string): Observable<Password[]> {
    let passwords = this.store.getState$(this.entity + '_list');
    if (passwords !== null) {
      return passwords.pipe(
        map((passwords) => this.passwordFilter(passwords, type)),
        delay(0),
        switchMap((passwords) => {
          this.store.setState(this.entity, passwords[0]);
          return of(passwords);
        })
      ) as Observable<Password[]>;
    }
    return of([]);
  }

  getSelectedPassword$(): Observable<Password> {
    return this.store.getState$(this.entity) as Observable<Password>;
  }

  search(searchText: string): Observable<Password[]> {
    let passwords = this.store.getState$(this.entity + '_list');
    if (passwords !== null) {
      return passwords.pipe(
        map((passwords) => this.passwordSearch(passwords, searchText)),
        delay(0),
        switchMap((passwords) => {
          this.store.setState(this.entity, passwords[0]);
          return of(passwords);
        })
      ) as Observable<Password[]>;
    }
    return of([]);
  }

  private passwordFilter(passwords: Password[], type: string): Password[] {
    if (passwords === null) {
      return [];
    }

    let list = [];
    switch (type) {
      case 'favourite':
        list = passwords.filter((password) => {
          return password.favourite == true;
        });
        break;
      case 'account':
        list = passwords.filter((password) => {
          return password.type == PasswordType.Account;
        });
        break;
      case 'credit':
        list = passwords.filter((password) => {
          return password.type == PasswordType.CreditCard;
        });
        break;
      case 'bank':
        list = passwords.filter((password) => {
          return password.type == PasswordType.Bank;
        });
        break;
      default:
        list = passwords;
    }
    return list;
  }

  private passwordSearch(
    passwords: Password[],
    searchText: string
  ): Password[] {
    if (passwords === null) {
      return [];
    }

    let list = [];
    if (searchText !== '') {
      list = passwords.filter((password) => {
        return password.name
          .toLocaleLowerCase()
          .includes(searchText.toLocaleLowerCase());
      });
    } else {
      list = passwords;
    }
    return list;
  }

  /*****************SELECTED VALUE ACTIONS********************** */
  get password(): Password {
    return this.store.getState(this.entity) as Password;
  }

  getPassword$(): Observable<Password> {
    return this.store.getState$(this.entity) as Observable<Password>;
  }

  selectPassword(password: Password): void {
    this.store.setState(this.entity, password);
  }

  create(): void{
    this.openDialog(new Password());
  }

  edit(): void{
    this.openDialog(this.password);
  }

  delete(): void{
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Password',
        message: `Are you sure you want to delete password ${
          this.password.name
        } ?`,
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let id = this.password!.id!;
        this.passwordApi.delete(id);
        this.store.setState(this.entity, undefined);
      }
    });
  }


  openDialog(password: Password): void {
    this.decryptData(password);

    const dialogRef = this.dialog.open(PasswordCreateDialog, {
      width: '750px',
      panelClass: 'dialog',
      data: { password: password, vaults: this.vaultCtrl.getVaults() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        const pwd = result as Password;
        this.savePassword(pwd);
      }
    });
  }

  favourite(): void {
    this.password!.favourite = !this.password!.favourite;
    this.passwordApi.update(this.password!, this.password!.id!);

    if (this.password!.favourite) {
      this.toastService.showToast('Added to favourites', 'Close');
    } else {
      this.toastService.showToast('Removed from favourites', 'Close');
    }
  }

  copyToClipBoard(value: string | undefined): void {
    if (typeof value !== 'undefined') {
      this.clipboardApi.copyFromContent(this.crypt.decryptData(value));
      this.toastService.showToast('Copied Value', 'Close');
    }
  }

  copyAccount(): void {
    let bankAccount = '';
    bankAccount += `${this.password!.name} \n`;
    bankAccount += `Account No: ${this.password!.bankAccountNo} \n`;
    bankAccount += `Name : ${this.password!.username} \n`;
    bankAccount += `Branch : ${this.password!.bankBranch} \n`;

    this.clipboardApi.copyFromContent(bankAccount);
    this.toastService.showToast('Bank Account Details Copied', 'Close');
  }

  private decryptData(password: Password): Password {
    password.password = this.crypt.decryptData(password.password);
    password.bankPin = this.crypt.decryptData(password.bankPin);
    password.cvc = this.crypt.decryptData(password.cvc);

    return password;
  }

  private savePassword(pwd: Password): void {
    pwd.password = this.crypt.encryptData(pwd.password);
    pwd.bankPin = this.crypt.encryptData(pwd.bankPin);
    pwd.cvc = this.crypt.encryptData(pwd.cvc);
    if (typeof pwd.id !== 'undefined') {
      pwd.updatedDate = new Date().toString();
      this.passwordApi.update(pwd, pwd.id);
    } else {
      pwd.createdDate = new Date().toString();
      pwd.updatedDate = new Date().toString();
      pwd.uid = this.userCtrl.uid.toString();
      this.passwordApi.add(pwd);
    }
  }
}
