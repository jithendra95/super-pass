import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VaultState } from 'src/app/states/vault.state';
import { ConfirmDialogComponent } from 'src/app/ui-elements/confirm-dialog/confirm-dialog.component';

export interface Vault {
  id?: string;
  name: string;
  subTitle: string;
  description: string;
}

@Component({
  selector: 'app-vault-view',
  templateUrl: './vault-view.component.html',
  styleUrls: ['./vault-view.component.scss'],
})
export class VaultViewComponent implements OnInit {
  vault: Vault = { name: '', subTitle: '', description: '' };
  vaultList: Vault[] = [];
  constructor(public dialog: MatDialog, public vaultState: VaultState) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(VaultCreateDialog, {
      width: '450px',
      data: this.vault,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        if (typeof result.id !== 'undefined') {
          this.vaultState.updateVault(result, result.id);
        } else {
          this.vaultState.addVault(result);
        }
        this.vault = { name: '', subTitle: '', description: '' };
      }
    });
  }

  edit(vault: Vault, index: number) {
    this.vault = vault;
    this.vault.id = index.toString();
    this.openDialog();
  }

  delete(index: number) {
    const vaultList = this.vaultState.getVaults();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Vault',
        message:
          `Are you sure you want to delete vault ${vaultList[index].name} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result){
        this.vaultState.deleteVault(index);
      }
    })
  }
}

@Component({
  selector: 'vault-create-dialog',
  templateUrl: 'vault-create.dialog.html',
})
export class VaultCreateDialog {
  constructor(
    public dialogRef: MatDialogRef<VaultCreateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Vault
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.data);
  }
}
