import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { Vault } from '../vault/vault-view/vault-view.component';

@Injectable({
  providedIn: 'root'
})
export class VaultState {
  vaultList: BehaviorSubject<Vault[]> = new BehaviorSubject<Vault[]>([]);
  constructor(private storage: StorageService) { 
      let vaultList = storage.read('vaultList');
      if(vaultList !== null){
        this.setVaults(vaultList);
      }
  }

  getVaults$(): Observable<Vault[]>{
    return this.vaultList.asObservable();
  }

  getVaults(): Vault[]{
    return this.vaultList.getValue();
  }

  addVault(vault: Vault): void{
      const vaultList = this.vaultList.getValue();
      vaultList.push(vault);
      this.setVaults(vaultList);
  }

  updateVault(vault: Vault, index: number): void{
    const vaultList = this.vaultList.getValue();
    vaultList[index] = vault;
    this.setVaults(vaultList);
}

deleteVault(index: number): void{
  const vaultList = this.vaultList.getValue();
  vaultList.splice(index, 1);
  this.setVaults(vaultList);
}

  setVaults(vaults:Vault[]): void{
    this.vaultList.next(vaults);
    this.storage.save(vaults, 'vaultList');
  }
}
