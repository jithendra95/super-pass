import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, first, Subscription } from 'rxjs';

export class BaseState<Type> {
  entity = '';
  constructor(protected db: AngularFireDatabase, entity: string) {
    this.entity = entity;
  }

  add(value: Type): void {
    const dbRef = this.db.database.ref(this.entity);
    dbRef.push(value);
  }

  addWithId(id: string | number, value: Type) {
    const dbRef = this.db.database.ref(this.entity);
    dbRef.child(id as string).set(value);
  }

  update(value: Type, id: number | string): void {
    const itemRef = this.db.object(`${this.entity}/${id}`);
    itemRef.update(value);
  }

  delete(id: number | string): void {
    const itemRef = this.db.object(`${this.entity}/${id}`);
    itemRef.remove();
  }
}

export class BaseStateObject<Type> extends BaseState<Type> {
  object: Type | null = null;

  constructor(db: AngularFireDatabase, entity: string) {
    super(db, entity);
  }

  override addWithId(id: string | number, value: Type) {
    this.object = value;
    super.addWithId(id, value);
  }

  read(id: string | number): Promise<boolean> {
    const thisInst = this;
    return new Promise(function(resolve, reject){
      thisInst.db
      .object(`${thisInst.entity}/${id}`)
      .valueChanges()
      .pipe(first())
      .subscribe((user) => {
        thisInst.object = user as Type;
        resolve(true);
      });
    })
  }

  unload(): void{
    this.object = null;
  }

  get(): Type | null {
    return this.object;
  }
}

export class BaseStateList<Type> extends BaseState<Type> {
  list: BehaviorSubject<unknown[]> = new BehaviorSubject<unknown[]>([]);
  listSub?: Subscription;
  uid: string = '';

  constructor(db: AngularFireDatabase, entity: string) {
    super(db, entity);
  }

  loadList(uid: string | number): void{  
    this.listSub = this.db
      .list(this.entity, (ref) => ref.orderByChild('uid').equalTo(uid!))
      .snapshotChanges()
      .subscribe((result) => {
        this.list.next( result.map((vaults) => {
          const $key = vaults.payload.key;
          const data = { id: $key, ...(vaults.payload.val() as object) };
          return data;
        })) 
      });
  }

  unloadList(): void{
    this.list = new BehaviorSubject<unknown[]>([]);
  }

  getList(): Type[] {
    return this.list.getValue() as Type[];
  }

  getList$() {
    return this.list.asObservable();
  }
}
