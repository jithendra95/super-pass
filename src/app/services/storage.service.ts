export class OfflineStorage {

  static save(item: any, entity: string): void {
    localStorage.setItem(entity, JSON.stringify(item));
  }

  static read(entity: string): any | null {
    let item = localStorage.getItem(entity);

    if (item !== null) return JSON.parse(item);
    else return item;
  }
}
