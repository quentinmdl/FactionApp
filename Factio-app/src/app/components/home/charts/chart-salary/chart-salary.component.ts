import { Component, OnInit } from '@angular/core';
import { concatMap, delay, first, map, switchMap } from 'rxjs/operators';

import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

import { Invoice } from 'src/app/api/_models';
import { InvoiceService } from 'src/app/api/_services';
import { forkJoin, observable, Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-chart-salary',
  templateUrl: './chart-salary.component.html',
  styleUrls: ['./chart-salary.component.css']
})
export class ChartSalaryComponent implements OnInit {

  currentUser: any;
  invoice: Invoice[];
  userId:number;
  currentInvoice: any;

  myChart:any;
  count: number;
  data: any;
  dataSalary = [];

  public actualDate;
  public updateDate;
  public yearDate
  public addDate: string;
  public currentMonth:string;

  constructor(
    private invoiceService: InvoiceService, 
  ) { }
  
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.currentUser.infos.id;

    this.updateChart();

  }

  chartSalary() {

    this.myChart = new Chart("chartSalary", {
      type: 'line',
      data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin','Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
              data: this.dataSalary,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          position: "top",
          text: ["Revenus","Revenus sur l'année"],
          fontSize: 16,
          fontStyle: "150",
          fontColor: "black",
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              beginAtZero: true,
              suggestedMin: 50,
              suggestedMax: 100
            },
              gridLines: {
              display:false
            }
          }],
          xAxes: [{
            ticks: {
              display: true,
            },
            gridLines: {
              display:false
            }
          }]
        },
      }

  });
  }

  
  updateChart() {  
    
    this.dataSalary.length = 0;
    this.actualDate = new Date();

    let monthDate = this.actualDate.getMonth()+1;
    let dayDate = this.actualDate.getDate(); 
    let minuteDate = this.actualDate.getMinutes();
    if (monthDate < 10) { 
      monthDate = '0' + monthDate.toString();
    } else {
      monthDate = monthDate.toString();
    }
    if (dayDate < 10) { 
      dayDate= '0' + dayDate.toString();
    } else {
      dayDate = dayDate.toString();
    }
    if (minuteDate < 10) {
      minuteDate = '0' + minuteDate.toString();
    } else {
      minuteDate = minuteDate.toString();
    }
  
    this.updateDate = "Actualisé le " + dayDate + "/" + monthDate + "/" +  this.actualDate.getFullYear().toString() + " à " + this.actualDate.getHours().toString() + ":" + minuteDate;

    this.yearDate =  this.actualDate.getFullYear();

   
    this.getDataSalary(); 

  }

  async getDataSalary() {

    for(let monthDate = 1; monthDate <= 12; monthDate++) {
    
      if (monthDate < 10) { 
        this.addDate = this.yearDate.toString() + '0' + monthDate.toString();
      } else {
        this.addDate = this.yearDate.toString() + monthDate.toString();
      }
      
      const that = this;

      await this.invoiceService.getInvoiceByUserFkDate(+this.userId, this.addDate).toPromise().then(invoice => {
        this.currentInvoice = invoice;
        
        if(this.currentInvoice.length == 0) {
          this.count = 0;
        } else {
            this.currentInvoice.forEach(element => {
            this.count += parseFloat(element.amountHt);
          });
        }
        this.dataSalary.push(this.count);
        that.data = this.dataSalary;    
      });
    }
    if(!Number.isNaN(this.dataSalary[0])) {
      this.chartSalary();
      this.updateData(this.myChart);
    } else {
      this.updateChart();
    }
    this.chartSalary();
    this.updateData(this.myChart);
  }  

  updateData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = this.data;
    });
    chart.update();
  }
}

