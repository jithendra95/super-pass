import { Injectable } from '@angular/core';
import { Vault } from '../models/vault.interface';
import { StorageService } from '../services/storage.service';
import { BaseState } from './base.state';

@Injectable({
  providedIn: 'root',
})
export class VaultState extends BaseState<Vault> {
  constructor(private storageService: StorageService) {
    super(storageService, 'vaultList');
  }

  get(id: string): Vault | undefined {
    return this.getList().find((obj) => {
      return obj['id'] == id;
    });
  }
}
