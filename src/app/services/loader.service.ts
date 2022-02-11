import { Injectable } from '@angular/core';
import { PasswordState } from '../states/password.state';
import { VaultState } from '../states/vault.state';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  constructor(
    private vaultState: VaultState,
    private passwordState: PasswordState
  ) {}

  load(uid: string | number): void{
    this.vaultState.loadList(uid);
    this.passwordState.loadList(uid);
  }

  unload(): void{
    this.vaultState.unloadList();
    this.passwordState.unloadList();
  }
}
