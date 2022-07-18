import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Password } from "../models/password.interface";
import { ConnectionService } from "../services/connection.service";
import { BaseApi } from "./base.api";

@Injectable({
    providedIn: 'root'
  })

export class PasswordApi extends BaseApi<Password>{
 constructor(db: AngularFireDatabase, connection: ConnectionService){
    super(db, 'password', connection);
 }
}