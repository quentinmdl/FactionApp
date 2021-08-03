import { Component, OnInit } from '@angular/core';
import { Color, Label } from 'ng2-charts'
import { Observable, of } from 'rxjs';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEditHourComponent } from './hour/add-edit-hour/add-edit-hour.component';

import { Hour } from 'src/app/api/_models';
import { HourService } from 'src/app/api/_services';



@Component({
  selector: 'app-chart-hour',
  templateUrl: './chart-hour.component.html',
  styleUrls: ['./chart-hour.component.css']
})
export class ChartHourComponent implements OnInit {

  myChart:any;
  currentUser: any;
  userId:number;
  hour: Hour[];
  currentHour: Hour[];

  data: any;
  dataHour = [];

  public actualDate;
  public updateDate;

  constructor(
    private dialog: MatDialog, 
    private hourService: HourService,
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.userId = this.currentUser.infos.id;

    this.updateChart();

  }

  chartHour() {

    this.myChart = new Chart("chartHour", {
      type: 'bar',
      data: {
          labels: ['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5'],
          datasets: [{
              data: this.dataHour,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)', 
            ],
          }]
      },
      options: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          position: "top",
          text: ["Temps de travail","Heures travaillées par semaine"],
          fontSize: 16,
          fontStyle: "150",
          fontColor: "black",
        },
        scales: {
          yAxes: [{
            ticks: {
              display: true,
              beginAtZero: true,
              suggestedMin: 0,
              suggestedMax: 5
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

    const that = this;
    this.hourService.getHourByUserFk(+this.userId)
    .pipe().subscribe( hour => {
      this.currentHour = hour;
        this.dataHour = [this.currentHour[0].week1,this.currentHour[0].week2,this.currentHour[0].week3,this.currentHour[0].week4,this.currentHour[0].week5];
        that.data = this.dataHour;
        this.updateData(this.myChart);
    });  
    this.chartHour();
  }

  updateData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = this.data;
    });
    chart.update();
  }

  addEditHour(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddEditHourComponent,{
      width: '640px',disableClose: true 
    });
  };
}
