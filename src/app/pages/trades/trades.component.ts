import { Component, OnInit } from '@angular/core';
import { StockStorageService } from '../../connectors/stock-storage.service';
import { ITradeRow } from '../../models/ITrade';

import * as moment from 'moment';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {


  constructor(private stockStorageService: StockStorageService) { }

  public tradeRows: ITradeRow[] = [];
  public total: number;
  public days: number;
  
  ngOnInit() {
    this
      .stockStorageService
      .getTrades()
      .subscribe(trades => {
        this.tradeRows = trades.value;
        this.tradeRows.orderByDescending(x => x.SoldOn);
        this.total = this.tradeRows.sum(x => x.ResultAmountNett);

        var start = moment(this.tradeRows[this.tradeRows.length - 1].SoldOn);
        this.days = moment().diff(start, 'days') + 1;
      });
  }
}
