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

  it("Should be an empty string when data is not provided",()=>{
    let encryptedValue = service.encryptData(undefined, "Secret");
    expect(encryptedValue).toBe("");
  })
});
