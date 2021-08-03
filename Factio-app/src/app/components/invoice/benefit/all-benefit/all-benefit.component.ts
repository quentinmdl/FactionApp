import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { Benefit } from 'src/app/api/_models';
import { BenefitService } from 'src/app/api/_services';

import { AddBenefitComponent } from '../add-benefit/add-benefit.component';
import { EditBenefitComponent } from '../edit-benefit/edit-benefit.component';


import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-benefit',
  templateUrl: './all-benefit.component.html',
  styleUrls: ['./all-benefit.component.css']
})
export class AllBenefitComponent implements OnInit {
  
  currentUser: any;
  benefits: Benefit[];
  benefits$: Observable<Benefit[]>;

  constructor(
    private router: Router, 
    private benefitService: BenefitService, 
    private dialog: MatDialog, private route: ActivatedRoute, 
    private toastr: ToastrService
    ) {  }

  private getBenefits() {
    return of(this.benefits).pipe(tap());
  }

  ngOnInit() {


    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let invoiceId // get invoiceId

    this.benefitService.getBenefitByInvoiceFk(+invoiceId)
      .subscribe( data => {
        this.benefits = data;

      this.benefits$ = this.getBenefits();
    });
  }

  deleteBenefit(benefit: Benefit): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Etes vous sur de vouloir supprimer le produit : ' + benefit.product
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.benefitService.delete(benefit.id)
        .subscribe( data => {
          this.benefits = this.benefits.filter(u => u !== benefit);
          this.ngOnInit();
          this.toastr.success("Suppression réussie");
        });
      }});
  };

  editBenefit(benefit: Benefit): void {
    window.localStorage.removeItem("editBenefitId");
    window.localStorage.setItem("editBenefitId", benefit.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditBenefitComponent,{
      width: '640px',disableClose: true 
    });
  };

  AddBenefit(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddBenefitComponent,{
      width: '640px',disableClose: true 
    });
  };

}

