import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPorfolioRow } from '../../models/IPorfolio';
import { IexTradingService } from '../../connectors/iex-trading.service';
import { StockStorageService } from '../../connectors/stock-storage.service';

@Component({
  selector: 'app-portfolio-detail',
  templateUrl: './portfolio-detail.component.html',
  styleUrls: ['./portfolio-detail.component.scss']
})
export class PortfolioDetailComponent implements OnInit {

  public symbol: string;
  public companyName: string;
  public boughtFor: number;
  public boughtOn: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private stockStorageService: StockStorageService,
    private iexTradingService: IexTradingService
  ) { 

  }

  ngOnInit() {
    this
      .activatedRoute
      .params
      .subscribe(params => {
        const rowKey = params['rowkey'];

        // get portfolio row
        this
          .stockStorageService
          .getPortfolio()
          .subscribe(portfolio => {
            const portfolioRow = portfolio.value.first(x => x.RowKey == rowKey);
            this.symbol = portfolioRow.Symbol;
            this.boughtFor = portfolioRow.BoughtFor;
            this.boughtOn = portfolioRow.BoughtOn;

            // get iex trading quote
            this
              .iexTradingService
              .getQuote(this.symbol)
              .subscribe(quote => {
                this.companyName = quote.companyName;
              });
        });          
      });
  }
}
