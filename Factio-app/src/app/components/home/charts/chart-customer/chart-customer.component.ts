import { Component, OnInit } from '@angular/core';
import { first, map, switchMap } from 'rxjs/operators';

import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

import { Customer } from 'src/app/api/_models';
import { CustomerService } from 'src/app/api/_services';


@Component({
  selector: 'app-chart-customer',
  templateUrl: './chart-customer.component.html',
  styleUrls: ['./chart-customer.component.css']
})
export class ChartCustomerComponent implements OnInit {

  currentUser: any;
  customer: Customer[];
  userId:number;
  currentCustomer: any;

  myChart:any;
  count: number;
  data: any;
  dataCustomer = [];

  public actualDate;
  public updateDate;
  public yearDate;
  public addDate: string;
  public currentMonth:string;

  

  constructor(
    private customerService: CustomerService, 
  ) { }
  
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.currentUser.infos.id;

    this.updateChart();

  }

  chartCustomer() {

    this.myChart = new Chart("chartCustomer", {
      type: 'line',
      data: {
          labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin','Jui', 'Aoû', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
              data: this.dataCustomer,
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
          text: ["Clients","Clients sur l'année"],
          fontSize: 16,
          fontStyle: "150",
          fontColor: "black",
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              beginAtZero: true,
              stepSize: 1
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

    this.getDataCustomer(); 

  }

  async getDataCustomer() {
  
    for(let monthDate = 1; monthDate <= 12; monthDate++) {
      
      if (monthDate < 10) { 
        this.addDate = this.yearDate.toString() + '0' + monthDate.toString();
      } else {
        this.addDate = this.yearDate.toString() + monthDate.toString();
      }

      const that = this;
      await this.customerService.getCustomerByUserFkDate(+this.userId, this.addDate).toPromise().then(customer => {
        this.currentCustomer = customer;
        this.count = (Object.keys(this.currentCustomer).length); 
        if (this.count == null || undefined || 0 ) {
          this.count = 0;
        }

        this.dataCustomer.push(this.count);
        that.data = this.dataCustomer;
      }); 
    }
    this.chartCustomer();
    this.updateData(this.myChart);
  } 

  updateData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = this.data;
    });
    chart.update();
  }

}
