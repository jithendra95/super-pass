import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { UserController } from '../controller/user.controller';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private userCtrl: UserController) {}

  encryptData(data: string | undefined): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }
    try {
      return AES.encrypt(data, this.userCtrl.getUser()?.secret!).toString();
    } catch (e) {
      return '';
    }
  }

  decryptData(data: string | undefined): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }

    try {
      const bytes = AES.decrypt(data, this.userCtrl.getUser()?.secret!);
      if (bytes.toString()) {
        let pass = bytes.toString(enc.Utf8);
        return pass;
      }

      return data;
    } catch (e) {
      return '';
    }
  }
}
