import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { BaseApi } from "src/app/api/base.api";
import { ConnectionService } from "src/app/services/connection.service";
import { StateStore } from "src/app/states/store.state";
import { BaseController } from "../base.controller";

export class MockObject{
    id: string;

    constructor(){
        this.id = 'mockId';
    }
}


@Injectable({
    providedIn: 'root'
  })

export class MockApi extends BaseApi<MockObject>{
 constructor(db: AngularFireDatabase, connection: ConnectionService){
    super(db, 'mock', connection);
 }
}

@Injectable({
    providedIn: 'root',
})
export class MockController extends BaseController<MockObject> {

    constructor(store: StateStore, api: MockApi) {
      super(store, api, 'mock');
    }
}