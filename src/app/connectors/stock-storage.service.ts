import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPorfolio } from '../models/IPorfolio';
import { ITrade } from '../models/ITrade';

@Injectable()
export class StockStorageService {

  constructor(private httpClient: HttpClient) { 

  }

  public getPortfolio = () : Observable<IPorfolio> => {
    const url = 'https://robinstockstorage.table.core.windows.net/portfolio?st=2017-12-24T10%3A24%3A00Z&se=2027-12-25T10%3A24%3A00Z&sp=r&sv=2017-04-17&tn=portfolio&sig=LMUCJoK5StZz%2FV1U%2BcoXpkj3WWed8MFXBgvIIfzRxnM%3D&$filter=IsActive&eq;true&$select=BoughtFor,BoughtOn,CurrentPercent,IsActive,LastPrice,Symbol,Threshold,ThresholdCrossed,UnitsBought,RowKey';
    return this.get(url);
  };

  public getTrades = () : Observable<ITrade> => {
    const url = 'https://robinstockstorage.table.core.windows.net/trade?st=2017-12-24T11%3A24%3A00Z&se=3000-12-25T11%3A24%3A00Z&sp=r&sv=2017-04-17&tn=trade&sig=FMJSBan%2FwXIiHpRqalmJzx1eykWAaHP6S2DC9ZAZ3hM%3D&$select=BoughtFor,BoughtOn,ProfitPerDay,ResultAmountGross,ResultAmountNett,ResultPercent,SoldFor,SoldOn,Symbol,UnitsBought';
    return this.get(url);
  };

  private get<T>(url: string) : Observable<T>
  {
    var headers = { Accept: 'application/json;odata=nometadata' };
    return this
      .httpClient
      .get(url, {headers: headers})
      .map(resonse => <T>resonse);
  }
}
