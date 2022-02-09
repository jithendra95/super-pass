import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, Observable } from 'rxjs';



export class BaseState<Type> {
  entity = '';
  constructor(protected db: AngularFireDatabase, entity: string) {
    this.entity = entity;
  }


  add(value: Type): void {
    const dbRef = this.db.database.ref(this.entity);
    dbRef.push(value);
  }

  addWithId(id: string | number, value: Type){
    const dbRef = this.db.database.ref(this.entity);
    dbRef.child(id as string).set(value);
  }

  update(value: Type, id: number | string): void {
    const itemRef = this.db.object(`${this.entity}\ ${id}`);
    itemRef.update(value);
  }

  delete(id: number | string): void {
    const itemRef = this.db.object(`${this.entity}\ ${id}`);
    itemRef.remove();
  }
}

export class BaseStateObject<Type> extends BaseState<Type> {
  object: Type | null = null;
  
  constructor(db: AngularFireDatabase, entity: string) {
    super(db, entity);
  }

  read(id: string | number){
    this.db.object(`${this.entity}\ ${id}`).valueChanges().pipe(first()).subscribe(user=>{
      this.object = user as Type;
    });
  }

  get(): Type | null {
    return this.object;
  }

}


export class BaseStateList<Type> extends BaseState<Type> {
  list: Observable<unknown[]> = new Observable<unknown[]>();
  
  constructor(db: AngularFireDatabase, entity: string) {
    super(db, entity);
    this.list = db.list(this.entity).valueChanges();
  }

  getList$(): Observable<Type[]> {
    return this.list as Observable<Type[]>;
  }

}
