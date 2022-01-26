import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PasswordState } from 'src/app/states/password.state';
import { VaultState } from 'src/app/states/vault.state';
import { ConfirmDialogComponent } from 'src/app/ui-elements/confirm-dialog/confirm-dialog.component';
import { Vault } from 'src/app/vault/vault-view/vault-view.component';
import { Password } from '../password.interface';

@Component({
  selector: 'app-password-view',
  templateUrl: './password-view.component.html',
  styleUrls: ['./password-view.component.scss'],
})
export class PasswordViewComponent implements OnInit {
  selected?: Password;
  pass: Password = { name: '', username: '', password: '', vault: '' };
  constructor(public dialog: MatDialog, public passwordState: PasswordState, public vaultState: VaultState) {}

  ngOnInit(): void {}

  select(item: Password, index: number) {
    this.selected = item;
    this.selected.id = index.toString();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordCreateDialog, {
      width: '450px',
      data: {password: this.pass, vaults: this.vaultState.getList()} 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        if (typeof result.id !== 'undefined') {
          this.passwordState.update(result, result.id);
        } else {
          this.passwordState.add(result);
        }
        this.pass = { name: '', username: '', password: '', vault: '' };
      }
    });
  }

  edit() {
    this.pass = this.selected!;
    this.openDialog();
  }

  delete() {
    const passList = this.passwordState.getList();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Password',
        message: `Are you sure you want to delete password ${this.selected!.name} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.passwordState.delete(parseInt(this.selected!.id!));
      }
    });
  }
}

@Component({
  selector: 'password-create-dialog',
  templateUrl: 'password-create.dialog.html',
})
export class PasswordCreateDialog {
  constructor(
    public dialogRef: MatDialogRef<PasswordCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {password:Password; vaults: Vault[]}
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.data.password);
  }
}
