import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, map, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConnectionService } from '../services/connection.service';
import { OfflineStorage } from '../services/storage.service';

export class BaseApi<Type> {
  protected entity: string = '';
  constructor(
    protected db: AngularFireDatabase,
    protected baseEntity: string,
    protected connection: ConnectionService
  ) {
    this.entity = environment.endpoint + baseEntity;
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

  read(id: string | number): Observable<unknown> {
    if (this.connection.getConnectionStatus()) {
      return this.db
        .object(`${this.entity}/${id}`)
        .valueChanges()
        .pipe(
          first(),
          switchMap((result) => {
            OfflineStorage.save(result, this.entity);
            return of(result);
          })
        );
    } else {
      let object = OfflineStorage.read(this.entity) as Type;
      return of(object);
    }
  }

  readAll(uid: string | number): Observable<unknown> {
    if (this.connection.getConnectionStatus()) {
      return this.db
        .list(this.entity, (ref) => ref.orderByChild('uid').equalTo(uid!))
        .snapshotChanges()
        .pipe(
          map((result) => {
            return result.map((obj) => {
              const $key = obj.payload.key;
              const data = { id: $key, ...(obj.payload.val() as object) };
              return data;
            });
          }),
          switchMap((result) => {
            OfflineStorage.save(result, this.entity+'_list');
            return of(result);
          })
        );
    } else {
      let objectList = OfflineStorage.read(this.entity+'_list') as Type[];
      return of(objectList);
    }
  }
}
