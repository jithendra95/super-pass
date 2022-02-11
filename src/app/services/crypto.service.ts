import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
import { UserState } from '../states/user.state';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private userState: UserState) {}

  encryptData(data: string | undefined): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }
    try {
      return AES.encrypt(data, this.userState.object?.secret!).toString();
    } catch (e) {
      return '';
    }
  }

  decryptData(data: string | undefined): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }

    try {
      const bytes = AES.decrypt(data, this.userState.object?.secret!);
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
