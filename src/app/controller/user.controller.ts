import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserApi } from '../api/user.api';
import { User } from '../models/user.interface';
import { StateStore } from '../states/store.state';
import { BaseController } from './base.controller';

@Injectable({
  providedIn: 'root',
})
export class UserController extends BaseController<User> {

  constructor(store: StateStore, userApi: UserApi) {
    super(store, userApi, 'user');
  }

  get uid(): string {
    return this.get()?.uid;
  }

  override createWithId(uid: string, user: User) {
    user.secret =
      new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
    super.createWithId(uid, user);
  }

}
