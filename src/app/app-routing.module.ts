import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TradesComponent } from './pages/trades/trades.component';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'portfolio/:rowkey', component: PortfolioDetailComponent},
  { path: 'trades', component: TradesComponent},
  
  { path: '*', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

