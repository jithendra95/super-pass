import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { User } from "../models/user.interface";
import { ConnectionService } from "../services/connection.service";
import { BaseApi } from "./base.api";

@Injectable({
    providedIn: 'root'
  })

export class UserApi extends BaseApi<User>{
 constructor(db: AngularFireDatabase, connection: ConnectionService){
    super(db, 'user', connection);
 }
}