import { TestBed, inject } from '@angular/core/testing';

import { IexTradingServiceService } from './iex-trading-service.service';

describe('IexTradingServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IexTradingServiceService]
    });
  });

  it('should be created', inject([IexTradingServiceService], (service: IexTradingServiceService) => {
    expect(service).toBeTruthy();
  }));
});
