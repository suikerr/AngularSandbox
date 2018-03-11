import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IQuote } from '../models/IQuote';
import { IChartRow } from '../models/IChartRow';

@Injectable()
export class IexTradingService {

  constructor(private httpClient: HttpClient) { 
  }

  public getQuote = (symbol: string) : Observable<IQuote> => {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/quote`;
    return this.get(url);    
  };

  public getChart = (symbol: string, period: string) : Observable<IChartRow[]> =>{
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/chart/${period}`;
    return this.get(url);
  }

  public getPrice = (symbol: string) : Observable<number> => {
    const url = `https://api.iextrading.com/1.0/stock/${symbol}/price`;
    return this.get<number>(url);
  }

  private get<T>(url: string) : Observable<T>
  {
    return this
      .httpClient
      .get(url)
      .map(resonse => <T>resonse);
  }
}
