import { Injectable } from '@angular/core';
import { PasswordController } from '../controller/password.controller';
import { UserController } from '../controller/user.controller';
import { VaultController } from '../controller/vault.controller';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  uid?: string | number;
  constructor(
    private userCtrl: UserController,
    private vaultCtrl: VaultController,
    private passwordCtrl: PasswordController
  ) {}

  load(uid: string | number): void {
    this.uid = uid;
    this.userCtrl.load(uid);
    this.vaultCtrl.load();
    this.passwordCtrl.load();
  }

  unload(): void {
    // this.vaultState.unloadList();
    // this.passwordState.unloadList();
  }

  reload(): void {
    if (this.uid) {
      this.unload();
      this.load(this.uid);
    }
  }
}
