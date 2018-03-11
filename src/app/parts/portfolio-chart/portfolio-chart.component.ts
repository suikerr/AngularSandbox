import { Component, OnInit, Input } from '@angular/core';
import { IexTradingService } from '../../connectors/iex-trading.service';

import * as moment from 'moment';

declare var Chart: any;

@Component({
  selector: 'app-portfolio-chart',
  templateUrl: './portfolio-chart.component.html',
  styleUrls: ['./portfolio-chart.component.scss']
})
export class PortfolioChartComponent implements OnInit {

  public periods: string[] = ['1m', '3m', '6m', '1y'];
  public selectedPeriod: string = '1m';
  public lineChart: any = null;

  @Input() public symbol: string;
  @Input() public boughtFor: number;
  @Input() public boughtOn: string;

  constructor(private iexTradingService: IexTradingService) {
  }

  ngOnInit(){
    this.getData()
  }

  selectedPeriodChange = (event: any) => {
    console.log("hallo");
    this.getData();
  };

  getData() {
    this
      .iexTradingService
      .getChart(this.symbol, this.selectedPeriod)
      .subscribe(chartRows => {
        const boughtForPlusOnePercent = this.boughtFor * 1.01;
        const closeData: number[] = [];
        const labels: string[] = [];

        const plusOnePercent = this.boughtFor * 1.01;
        chartRows.forEach(x => {
          closeData.push(x.close);
          labels.push(x.date);
        });

        var boughtOnString = moment(this.boughtOn).format("YYYY-MM-DD");
        console.log(boughtOnString);



        this
          .iexTradingService
          .getPrice(this.symbol)
          .subscribe(price => {
            closeData.push(price);
            labels.push("now");

            var config = {
              type: 'line',
              data: {
                labels: labels,
                datasets: [{
                  label: "Close",
                  backgroundColor: 'red',
                  borderColor: 'red',
                  data: closeData,
                  fill: false,
                  lineTension: 0,
                },
                {
                  label: 'BoughtFor/on',
                  backgroundColor: 'blue',
                  data: []
                },
                {
                  label: 'BoughtFor + 1%',
                  backgroundColor: 'green',
                  data: []
                }]
              },
              options: {
                responsive: true,
                tooltips: {
                  mode: 'index',
                  intersect: false,
                },
                annotation: {
                  annotations: [{
                    type: 'line',
                    id: 'hLine',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: this.boughtFor,  // data-value at which the line is drawn
                    borderWidth: 2,
                    borderColor: 'blue'
                  },
                  {
                    type: 'line',
                    id: 'hLine2',
                    mode: 'horizontal',
                    scaleID: 'y-axis-0',
                    value: boughtForPlusOnePercent,  // data-value at which the line is drawn
                    borderWidth: 2,
                    borderColor: 'green'
                  },
                  {
                    type: 'line',
                    id: 'vLine',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: boughtOnString,
                    borderWidth: 2,
                    borderColor: 'blue'
                  }]
                }
              }
            };
    
            if(this.lineChart != null)
            {
              this.lineChart.destroy();
            }

            var ctx = (<HTMLCanvasElement>document.getElementById("canvas")).getContext("2d");
            this.lineChart = new Chart(ctx, config);
                
          });
      });
  }
}
