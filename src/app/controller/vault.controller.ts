import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { VaultApi } from '../api/vault.api';
import { VaultCreateDialog } from '../components/vault/vault-view/vault-view.component';
import { Vault } from '../models/vault.interface';
import { StateStore } from '../states/store.state';
import { ConfirmDialogComponent } from '../ui-elements/confirm-dialog/confirm-dialog.component';
import { BaseController } from './base.controller';
import { UserController } from './user.controller';

@Injectable({
  providedIn: 'root',
})
export class VaultController extends BaseController<Vault>{

  constructor(
    store: StateStore,
    private vaultApi: VaultApi,
    private userCtrl: UserController,
    public dialog: MatDialog
  ) {
    super(store, vaultApi, 'vault');
  }

  public findVault(id: string): Vault | undefined {
    return this.getAll().find((obj) => {
      return obj['id'] == id;
    });
  }


  public delete(vault: Vault) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Delete Vault',
        message: `Are you sure you want to delete vault ${vault.name} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vaultApi.delete(vault.id!);
      }
    });
  }

  public create(): void {
    this.openDialog(new Vault());
  }

  public edit(vault: Vault): void {
    this.openDialog(vault);
  }

  private openDialog(vault: Vault): void {
    const dialogRef = this.dialog.open(VaultCreateDialog, {
      width: '450px',
      data: vault,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (typeof result !== 'undefined') {
        this.saveVault(result);
      }
    });
  }

  public saveVault(vault: Vault): void {
    if (typeof vault.id !== 'undefined') {
      this.vaultApi.update(vault, vault.id);
    } else {
      vault.uid = this.userCtrl.uid.toString();
      this.vaultApi.add(vault);
    }
  }
}
