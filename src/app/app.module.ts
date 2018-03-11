import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TradesComponent } from './pages/trades/trades.component';
import { HttpClientModule } from '@angular/common/http';
import { StockStorageService } from './connectors/stock-storage.service';
import { SettingsService } from './connectors/settings.service';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';
import { IexTradingService } from './connectors/iex-trading.service';
import { PortfolioChartComponent } from './parts/portfolio-chart/portfolio-chart.component';
import { CryptoCompareService } from './connectors/crypto-compare.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PortfolioComponent,
    TradesComponent,
    PortfolioDetailComponent,
    PortfolioChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StockStorageService,
    SettingsService,
    IexTradingService,
    CryptoCompareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
