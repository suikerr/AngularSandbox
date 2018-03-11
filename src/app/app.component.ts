import { Component } from '@angular/core';
import { SettingsService } from './connectors/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public newPortfolioSinceLastVisit: number = 1;

  constructor(public settingsService: SettingsService) {
    this.newPortfolioSinceLastVisit = settingsService.newPortfolioSinceLastVisit;      
  }

  title = 'app';
}
