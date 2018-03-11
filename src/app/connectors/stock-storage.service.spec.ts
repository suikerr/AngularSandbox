import { TestBed, inject } from '@angular/core/testing';

import { StockStorageService } from './stock-storage.service';

describe('StockStorageConnectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockStorageService]
    });
  });

  it('should be created', inject([StockStorageService], (service: StockStorageService) => {
    expect(service).toBeTruthy();
  }));
});
