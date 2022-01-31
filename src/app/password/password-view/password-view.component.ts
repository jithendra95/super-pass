import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
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
  pass: Password = { name: '', username: '', password: '', vault: '', type: PasswordType.Account };

  subs: Subscription[] = [];
  constructor(public dialog: MatDialog, public passwordState: PasswordState, public vaultState: VaultState) {
    this.subs.push(this.passwordState.getList$().subscribe(list=>{
       if(typeof list !== undefined && list.length > 0 && this.selected === undefined){
         this.selected = list[0];
       }
    }))
  }

  ngOnInit(): void {}

  ngOnDestroy(): void{
    this.subs.forEach(sub=>{
      sub.unsubscribe();
    })
  }

  select(item: Password, index: number) {
    this.selected = item;
    this.selected.id = index.toString();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PasswordCreateDialog, {
      width: '750px',
      data: {password: this.pass, vaults: this.vaultState.getList()} 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        if (typeof result.id !== 'undefined') {
          result.updatedDate = new Date();
          this.passwordState.update(result, result.id);
        } else {
          result.createdDate = new Date();
          result.updatedDate = new Date();
          result.id = this.passwordState.getList().length;
          this.passwordState.add(result);
        }
        this.pass = { name: '', username: '', password: '', vault: '', type: PasswordType.Account };
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
  passwordType = PasswordType;
  passwordTypeKeys = Object.keys(this.passwordType).filter(key => !isNaN(Number(key)));
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

  getPasswordDesc(index: string): string{
    return PasswordType[parseInt(index)]
  }
  
}
