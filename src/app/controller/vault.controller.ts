import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { VaultApi } from '../api/vault.api';
import { VaultCreateDialog } from '../components/vault/vault-view/vault-view.component';
import { Vault } from '../models/vault.interface';
import { StateStore } from '../states/store.state';
import { ConfirmDialogComponent } from '../ui-elements/confirm-dialog/confirm-dialog.component';
import { UserController } from './user.controller';

@Injectable({
  providedIn: 'root',
})
export class VaultController {
  subs: Subscription[] = [];
  entity: string = 'vault';
  constructor(
    private store: StateStore,
    private vaultApi: VaultApi,
    private userCtrl: UserController,
    public dialog: MatDialog
  ) {}

  load(): void {
    this.subs.push(
      this.vaultApi.readAll(this.userCtrl.uid).subscribe((passwords) => {
        this.store.setState(this.entity + '_list', passwords);
      })
    );
  }

  getVaults$(): Observable<Vault[]> {
    return this.store.getState$(this.entity + '_list') as Observable<Vault[]>;
  }

  getVaults(): Vault[] {
    return this.store.getState(this.entity + '_list') as Vault[];
  }

  findVault(id: string): Vault | undefined {
    return this.getVaults().find((obj) => {
      return obj['id'] == id;
    });
  }

  getSelectedVault$(): Observable<Vault> {
    return this.store.getState$(this.entity) as Observable<Vault>;
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
        this.vaultApi.delete(vault.id!);
      }
    });
  }

  create(): void {
    this.openDialog(new Vault());
  }

  edit(vault: Vault): void {
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

  private saveVault(vault: Vault): void {
    if (typeof vault.id !== 'undefined') {
      this.vaultApi.update(vault, vault.id);
    } else {
      vault.uid = this.userCtrl.uid.toString();
      this.vaultApi.add(vault);
    }
  }
}
