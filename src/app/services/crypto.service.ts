import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  encryptSecretKey = 'theEcryptionKeyTemp';
  constructor() {}

  encryptData(data: string | undefined): string {
    if (typeof data === 'undefined') {
      return '';
    }
    try {
      return AES.encrypt(data, this.encryptSecretKey).toString();
    } catch (e) {
      return '';
    }
  }

  decryptData(data: string | undefined): string {
    if (typeof data === 'undefined') {
      return '';
    }

    try {
      const bytes = AES.decrypt(data, this.encryptSecretKey);
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
