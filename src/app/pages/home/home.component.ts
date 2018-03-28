import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../connectors/settings.service';
import { CryptoCompareService } from '../../connectors/crypto-compare.service';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public test: string;
  public stockPrice: number;
  public vergeValue: number;
  public vergeIsLoading: boolean = true;

  constructor(
    public settingsService: SettingsService,
    private cryptoCompareService: CryptoCompareService
  ) { }

  ngOnInit() {
    this.loadVerge();

    moment.locale('nl');
    this.test = moment().format('dddd D MMMM YYYY');
  }


  public refreshXvg = () => {
    this.vergeIsLoading = true;
    this.loadVerge();
  }

  private loadVerge = () => {
    this
      .cryptoCompareService
      .getPrice('XVG')
      .subscribe(stockPrice => {
        this.stockPrice = stockPrice;
        this.vergeValue = stockPrice * .95 * 2146.40046600;
        setTimeout(() => {
          this.vergeIsLoading = false;
        }, 200);
      });
  }
}
