import { Component, OnInit } from '@angular/core';
import { StockStorageService } from '../../connectors/stock-storage.service';
import { IPorfolioRow } from '../../models/IPorfolio';
import "./../../extensions/ArrayExtensions";
import { SettingsService } from '../../connectors/settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  constructor(private stockStorageService: StockStorageService, private router: Router) { }

  public portfolioRows: IPorfolioRow[] = [];
  public totalInvested: number = 0;
  public thresholdCrossedCount: number = 0;
  public plusCount: number = 0;
  public minusCount: number = 0;

  ngOnInit() {
    this
      .stockStorageService
      .getPortfolio()
      .subscribe(portfolio => {
        this.portfolioRows = portfolio.value.orderByDescending(x => x.BoughtOn);

        this.plusCount = this.portfolioRows.count(x => x.CurrentPercent > 0);
        this.minusCount = this.portfolioRows.count(x => x.CurrentPercent <= 0);
        this.thresholdCrossedCount = this.portfolioRows.count(x => x.ThresholdCrossed);
        this.totalInvested = this.portfolioRows.sum(x => x.BoughtFor * x.UnitsBought);
      });
  }
}

