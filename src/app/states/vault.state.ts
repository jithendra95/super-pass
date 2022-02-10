import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Vault } from '../models/vault.interface';
import { BaseStateList } from './base.state';

@Injectable({
  providedIn: 'root',
})
export class VaultState extends BaseStateList<Vault> {
  constructor(db: AngularFireDatabase) {
    super(db, 'vault');
  }

  get(id: string): Vault | undefined {
    // return this.getList().find((obj) => {
    //   return obj['id'] == id;
    // });
    return undefined;
  }
}
