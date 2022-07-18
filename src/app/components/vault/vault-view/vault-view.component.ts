import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VaultController } from 'src/app/controller/vault.controller';
import { Vault } from 'src/app/models/vault.interface';

@Component({
  selector: 'app-vault-view',
  templateUrl: './vault-view.component.html',
  styleUrls: ['./vault-view.component.scss'],
})
export class VaultViewComponent implements OnInit {
  constructor(public dialog: MatDialog, public vaultCtrl: VaultController) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  add() {
    this.vaultCtrl.create();
  }
  edit(vault: Vault) {
    this.vaultCtrl.edit(vault);
  }

  delete(vault: Vault) {
    this.vaultCtrl.delete(vault);
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
