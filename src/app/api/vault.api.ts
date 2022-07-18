import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Vault } from "../models/vault.interface";
import { ConnectionService } from "../services/connection.service";
import { BaseApi } from "./base.api";

@Injectable({
    providedIn: 'root'
  })

export class VaultApi extends BaseApi<Vault>{
 constructor(db: AngularFireDatabase, connection: ConnectionService){
    super(db, 'vault', connection);
 }
}