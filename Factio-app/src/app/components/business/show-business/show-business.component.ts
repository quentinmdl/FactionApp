import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom, first } from 'rxjs/operators';

import { Business } from 'src/app/api/_models';
import { BusinessService, LoadingService } from 'src/app/api/_services';

import { AddBusinessComponent } from '../add-business/add-business.component';
import { EditBusinessComponent } from '../edit-business/edit-business.component';

import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-show-business',
  templateUrl: './show-business.component.html',
  styleUrls: ['./show-business.component.css']
})

export class ShowBusinessComponent implements OnInit {

  currentUser: any;
  currentBusiness: Business;

  constructor(
    private router: Router, 
    private businessService: BusinessService, 
    private route: ActivatedRoute,
    private dialog: MatDialog,
    public loader: LoadingService
  ) { }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.businessService.getBusinessByUserFk(+userId)
    .subscribe( data => {
      this.currentBusiness = data;
    });

  }

  addBusiness(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddBusinessComponent,{
      width: '640px',disableClose: true 
    });
  };

  editBusiness(business: Business): void {
    window.localStorage.removeItem("editBusinessId");
    window.localStorage.setItem("editBusinessId", business.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditBusinessComponent,{
      width: '640px',disableClose: true 
    });
  };
}

