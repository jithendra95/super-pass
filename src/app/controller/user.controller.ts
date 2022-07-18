import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserApi } from '../api/user.api';
import { User } from '../models/user.interface';
import { StateStore } from '../states/store.state';

@Injectable({
  providedIn: 'root',
})
export class UserController {
  subs: Subscription[] = [];
  entity: string = 'user';
  public uid: string | number = '';
  constructor(private store: StateStore, private userApi: UserApi) {}

  load(uid: string | number): void {
    this.uid = uid;
    this.subs.push(
      this.userApi.read(uid).subscribe((user) => {
        this.store.setState(this.entity, user);
      })
    );
  }

  getUser$(): Observable<User> {
    return this.store.getState$(this.entity) as Observable<User>;
  }

  getUser(): User{
    return this.store.getState(this.entity) as User;
  }
  
  createUser(uid: string, user: User) {
    user.secret =
      new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
    this.userApi.addWithId(uid, user);
    this.store.setState(this.entity, user);
  }

  unload(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
