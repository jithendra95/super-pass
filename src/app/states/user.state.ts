import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { User } from "../models/user.interface";
import { BaseStateObject } from "./base.state";

@Injectable({
    providedIn: 'root'
  })
  export class UserState extends BaseStateObject<User> {
  
    constructor(db: AngularFireDatabase) { 
        super(db, 'User');
    }
  
  }