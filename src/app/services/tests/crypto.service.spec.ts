import { TestBed } from '@angular/core/testing';

import { CryptoService } from '../crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoService);
  });

  it("Should encrypt data when provided",()=>{
    let encryptedValue = service.encryptData("data", "Secret");
    expect(encryptedValue).toBeDefined();
  })

  it("Should be an empty string when data is not provided for encryption",()=>{
    let encryptedValue = service.encryptData(undefined, "Secret");
    expect(encryptedValue).toBe("");
  })

  it("Should decrypt data when provided",()=>{
    let encryptedValue = service.decryptData("data", "Secret");
    expect(encryptedValue).toBeDefined();
  })

  it("Should be an empty string when data is not provided for decryption",()=>{
    let encryptedValue = service.decryptData(undefined, "Secret");
    expect(encryptedValue).toBe("");
  })
});
