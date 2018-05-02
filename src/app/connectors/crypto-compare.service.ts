import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CryptoCompareService {

  constructor(private httpClient: HttpClient) { }

  public getPrice = (symbol: string): Observable<number> => {
    const url = `https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=EUR`;
    return this
      .httpClient
      .get(url)
      .map((resonse: any) => resonse.EUR);
  }
}
