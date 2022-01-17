import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  save(item: any, entity: string): void {
    localStorage.setItem('vaultList', JSON.stringify(item));
  }

  read(entity: string): any | null {
    let item = localStorage.getItem(entity);

    if (item !== null) return JSON.parse(item);
    else return item;
  }
}
