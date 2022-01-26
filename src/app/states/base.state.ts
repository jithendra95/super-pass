import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

export class BaseState<Type> {
  list: BehaviorSubject<Type[]> = new BehaviorSubject<Type[]>([]);
  entity = '';
  constructor(private storage: StorageService, entity: string) {
    this.entity = entity;
    let list = storage.read(entity);
    if (list !== null) {
      this.set(list);
    }
  }

  getList$(): Observable<Type[]> {
    return this.list.asObservable();
  }

  getList(): Type[] {
    return this.list.getValue();
  }

  add(value: Type): void {
    const vaultList = this.list.getValue();
    vaultList.push(value);
    this.set(vaultList);
  }

  update(value: Type, index: number): void {
    const list = this.list.getValue();
    list[index] = value;
    this.set(list);
  }

  delete(index: number): void {
    const list = this.list.getValue();
    list.splice(index, 1);
    this.set(list);
  }

  

  private set(values: Type[]): void {
    this.list.next(values);
    this.storage.save(values, this.entity);
  }
}
