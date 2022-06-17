import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Vault } from 'src/app/models/vault.interface';
import { UserState } from 'src/app/states/user.state';
import { VaultState } from 'src/app/states/vault.state';
import { ConfirmDialogComponent } from 'src/app/ui-elements/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vault-view',
  templateUrl: './vault-view.component.html',
  styleUrls: ['./vault-view.component.scss'],
})
export class VaultViewComponent implements OnInit {
  vault: Vault;

  constructor(
    public dialog: MatDialog,
    public vaultState: VaultState,
    private userState: UserState
  ) {
    this.vault = {
      name: '',
      subTitle: '',
      description: '',
      uid: this.userState.object?.uid!,
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(VaultCreateDialog, {
      width: '450px',
      data: this.vault,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        if (typeof result.id !== 'undefined') {
          this.vaultState.update(result, result.id);
        } else {
          result.uid = this.userState.object?.uid!;
          this.vaultState.add(result);
        }
        this.vault = {
          name: '',
          subTitle: '',
          description: '',
          uid: this.userState.object?.uid!,
        };
      }
    });
  }

  edit(vault: Vault) {
    this.vault = vault;
    this.openDialog();
  }

  delete(vault: Vault) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Vault',
        message: `Are you sure you want to delete vault ${vault.name} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vaultState.delete(vault.id!);
      }
    });
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
