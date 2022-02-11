import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { User } from "../models/user.interface";
import { LoaderService } from "../services/loader.service";
import { BaseStateObject } from "./base.state";

@Injectable({
    providedIn: 'root'
  })
  export class UserState extends BaseStateObject<User> {
  
    loaded = false;
    constructor(db: AngularFireDatabase, private loadService: LoaderService) { 
        super(db, 'User');
    }

    override async read(id: string | number): Promise<boolean> {
        await super.read(id);
        if(!this.loaded)
          this.loadService.load(id);
          this.loaded = true;

        return true;
    }

    override unload(): void {
      super.unload();
      this.loadService.unload();
      this.loaded = false;
    }
  
  }