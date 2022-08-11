import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  encryptData(data: string | undefined, secret: string): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }
    try {
      return AES.encrypt(data, secret).toString();
    } catch (e) {
      return '';
    }
  }

  decryptData(data: string | undefined, secret: string): string {
    if (typeof data === 'undefined' || data == '') {
      return '';
    }

    try {
      const bytes = AES.decrypt(data, secret);
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
