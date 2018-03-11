import { Injectable } from '@angular/core';
import { StockStorageService } from './stock-storage.service';

@Injectable()
export class SettingsService {

  public lastvisit: string = (new Date()).toISOString();
  public newPortfolioSinceLastVisit: number = 0;
  public newTradesSinceLastVisit: number = 0;
  
  constructor(stockStorageService: StockStorageService) { 
    const key: string = 'lastVisitKey';
    var lastVisit = localStorage.getItem(key);
    if(lastVisit)
    {
      this.lastvisit = lastVisit;
    }

    localStorage.setItem(key, (new Date()).toISOString());

    stockStorageService
      .getPortfolio()
      .subscribe(portfolio => {
        this.newPortfolioSinceLastVisit = portfolio.value.count(x => x.BoughtOn > lastVisit);
      });

      stockStorageService
        .getTrades()
        .subscribe(trades => {
          this.newTradesSinceLastVisit = trades.value.count(x => x.SoldOn > lastVisit);
        })
  }
}
