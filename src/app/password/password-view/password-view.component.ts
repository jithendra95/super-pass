import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ClipboardService } from 'ngx-clipboard';
import { Subscription } from 'rxjs';
import { CryptoService } from 'src/app/services/crypto.service';
import { ToastService } from 'src/app/services/toast.service';
import { PasswordState } from 'src/app/states/password.state';
import { VaultState } from 'src/app/states/vault.state';
import { ConfirmDialogComponent } from 'src/app/ui-elements/confirm-dialog/confirm-dialog.component';
import { Vault } from 'src/app/vault/vault-view/vault-view.component';
import { Password, PasswordType } from '../password.interface';

@Component({
  selector: 'app-password-view',
  templateUrl: './password-view.component.html',
  styleUrls: ['./password-view.component.scss'],
})
export class PasswordViewComponent implements OnInit {
  selected?: Password;
  passwordType = PasswordType;
  pass: Password = {
    name: '',
    username: '',
    password: '',
    vault: '',
    type: PasswordType.Account,
  };

  passwordList: Password[] = [];
  searchText = '';
  subs: Subscription[] = [];
  constructor(
    public dialog: MatDialog,
    public passwordState: PasswordState,
    public vaultState: VaultState,
    private clipboardApi: ClipboardService,
    private toastService: ToastService,
    private crypt: CryptoService
  ) {
    this.subs.push(
      this.passwordState.getList$().subscribe((list) => {
        if (
          typeof list !== undefined &&
          list.length > 0 &&
          this.selected === undefined
        ) {
          this.passwordList = list;
          this.selected = list[0];
        }
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  select(item: Password, index: number) {
    this.selected = item;
    this.selected.id = index.toString();
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
        result.password = this.crypt.encryptData(result.password);
        result.bankPin = this.crypt.encryptData(result.bankPin);
        result.cvc = this.crypt.encryptData(result.cvc);
        if (typeof result.id !== 'undefined') {
          result.updatedDate = new Date();

          this.passwordState.update(result, result.id);
        } else {
          result.createdDate = new Date();
          result.updatedDate = new Date();
          result.id = this.passwordState.getList().length;

          this.passwordState.add(result);
        }
        this.pass = {
          name: '',
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
        this.passwordState.delete(parseInt(id));
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
    this.passwordList = this.passwordState.getList();
  }

  favourite(): void {
    this.selected!.favourite = !this.selected!.favourite;
    this.passwordState.update(this.selected!, parseInt(this.selected!.id!));

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

  showHidePassword(value: string) {
    switch (value) {
      case 'password':
        this.showPassword = !this.showPassword;
        break;
      case 'pin':
        this.showPin = !this.showPin;
        break;
      case 'cvc':
        this.showCvc = !this.showCvc;
        break;
    }
  }
}
