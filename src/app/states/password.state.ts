import { Injectable } from '@angular/core';
import { Password } from '../models/password.interface';
import { StorageService } from '../services/storage.service';
import { BaseState } from './base.state';

@Injectable({
  providedIn: 'root'
})
export class PasswordState extends BaseState<Password> {

  constructor(private storageService: StorageService) { 
      super(storageService, 'passwordList');
  }

}
