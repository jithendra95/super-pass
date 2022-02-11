import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { Password, PasswordType } from 'src/app/models/password.interface';
import { Vault } from 'src/app/models/vault.interface';
import { CryptoService } from 'src/app/services/crypto.service';
import { ToastService } from 'src/app/services/toast.service';
import { PasswordState } from 'src/app/states/password.state';
import { UserState } from 'src/app/states/user.state';
import { VaultState } from 'src/app/states/vault.state';
import { ConfirmDialogComponent } from 'src/app/ui-elements/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-password-view',
  templateUrl: './password-view.component.html',
  styleUrls: ['./password-view.component.scss'],
})
export class PasswordViewComponent implements OnInit {
  selected?: Password;
  passwordType = PasswordType;
  pass: Password;

  passwordList: Password[] = [];
  allValues: Password[] = [];
  searchText = '';
  subs: Subscription[] = [];

  routerSubs?: Subscription;
  passwordSubs?: Subscription;

  isLoading = true;

  constructor(
    public dialog: MatDialog,
    public passwordState: PasswordState,
    public vaultState: VaultState,
    public userState: UserState,
    private clipboardApi: ClipboardService,
    private toastService: ToastService,
    private crypt: CryptoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.pass = {
      name: '',
      uid: '',
      username: '',
      password: '',
      vault: '',
      type: PasswordType.Account,
    };

    this.subs.push(
      this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      })
    );
  }

  initialize(): void {
    if (this.routerSubs) {
      this.routerSubs.unsubscribe();
    }

    if (this.passwordSubs) {
      this.passwordSubs.unsubscribe();
    }

    this.selected = undefined;

    this.routerSubs = this.route.queryParams.subscribe((params) => {
      let type = params['type'];

      this.passwordSubs = this.passwordState.getList$().subscribe((result) => {
        // let list = result.map((vaults) => {
        //   const $key = vaults.payload.key;
        //   const data = { id: $key, ...(vaults.payload.val() as object) };
        //   return data;
        // }) as Password[];

        let list = result as Password[];

        this.isLoading = false;
        if (typeof list !== undefined && list.length > 0) {
          this.allValues = list;
          switch (type) {
            case 'favourite':
              this.passwordList = list.filter((password) => {
                return password.favourite == true;
              });
              break;
            case 'account':
              this.passwordList = list.filter((password) => {
                return password.type == PasswordType.Account;
              });
              break;
            case 'credit':
              this.passwordList = list.filter((password) => {
                return password.type == PasswordType.CreditCard;
              });
              break;
            case 'bank':
              this.passwordList = list.filter((password) => {
                return password.type == PasswordType.Bank;
              });
              break;
            default:
              this.passwordList = list;
          }

          if (this.selected === undefined && this.passwordList.length > 0)
            this.selected = this.passwordList[0];
        } else {
          this.passwordList = [];
        }
      });
    });
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });

    if (this.routerSubs) {
      this.routerSubs.unsubscribe();
    }

    if (this.passwordSubs) {
      this.passwordSubs.unsubscribe();
    }
  }

  select(item: Password) {
    this.selected = item;
  }

  openDialog(): void {
    this.pass.password = this.crypt.decryptData(this.pass.password);
    this.pass.bankPin = this.crypt.decryptData(this.pass.bankPin);
    this.pass.cvc = this.crypt.decryptData(this.pass.cvc);

    const dialogRef = this.dialog.open(PasswordCreateDialog, {
      width: '750px',
      panelClass: 'dialog',
      data: { password: this.pass, vaults: this.vaultState.getList() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        const pwd = result as Password;

        pwd.password = this.crypt.encryptData(pwd.password);
        pwd.bankPin = this.crypt.encryptData(pwd.bankPin);
        pwd.cvc = this.crypt.encryptData(pwd.cvc);
        if (typeof pwd.id !== 'undefined') {
          pwd.updatedDate = (new Date()).toString();
          this.passwordState.update(pwd, pwd.id);
        } else {
          pwd.createdDate = (new Date()).toString();
          pwd.updatedDate = (new Date()).toString();
          pwd.uid = this.userState.object?.uid!;
          this.passwordState.add(pwd);
        }
        this.pass = {
          name: '',
          uid: this.userState.object?.uid!,
          username: '',
          password: '',
          vault: '',
          type: PasswordType.Account,
        };
      }
    });
  }

  edit() {
    this.pass = this.selected!;
    this.openDialog();
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Password',
        message: `Are you sure you want to delete password ${
          this.selected!.name
        } ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let id = this.selected!.id!;
        this.selected = undefined;
        this.passwordState.delete(id);
      }
    });
  }

  search(): void {
    if (this.searchText !== '') {
      this.passwordList = this.passwordList.filter((password) => {
        return password.name
          .toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase());
      });
      this.selected = this.passwordList[0];
    } else {
      this.reloadPasswordList();
    }
  }

  changeSearch(): void {
    if (this.searchText == '') {
      this.reloadPasswordList();
    }
  }

  reloadPasswordList(): void {
    this.passwordList = this.allValues;
  }

  favourite(): void {
    this.selected!.favourite = !this.selected!.favourite;
    this.passwordState.update(this.selected!, this.selected!.id!);

    if (this.selected!.favourite) {
      this.toastService.showToast('Added to favourites', '');
    } else {
      this.toastService.showToast('Removed from favourites', '');
    }
  }

  copyToClipBoard(value: string | undefined): void {
    if (typeof value !== 'undefined') {
      this.clipboardApi.copyFromContent(this.crypt.decryptData(value));
      this.toastService.showToast('Copied Value', '');
    }
  }

  copyAccount(): void {
    let bankAccount = '';
    bankAccount += `${this.selected!.name} \n`;
    bankAccount += `Account No: ${this.selected!.bankAccountNo} \n`;
    bankAccount += `Name : ${this.selected!.username} \n`;
    bankAccount += `Branch : ${this.selected!.bankBranch} \n`;

    this.clipboardApi.copyFromContent(bankAccount);
    this.toastService.showToast('Bank Account Details', '');
  }
}

@Component({
  selector: 'password-create-dialog',
  templateUrl: 'password-create.dialog.html',
  styleUrls: ['./password-create.dialog.scss'],
})
export class PasswordCreateDialog {
  passwordType = PasswordType;
  passwordTypeKeys = Object.keys(this.passwordType).filter(
    (key) => !isNaN(Number(key))
  );

  showPassword = false;
  showPin = false;
  showCvc = false;

  constructor(
    public dialogRef: MatDialogRef<PasswordCreateDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { password: Password; vaults: Vault[] }
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.data.password);
  }

  getPasswordDesc(index: string): string {
    return PasswordType[parseInt(index)];
  }
}
