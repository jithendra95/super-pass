import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Password } from '../models/password.interface';
import {  BaseStateList } from './base.state';
import { UserState } from './user.state';

@Injectable({
  providedIn: 'root'
})
export class PasswordState extends BaseStateList<Password> {

  constructor(db: AngularFireDatabase) { 
      super(db, 'password');
  }

}
