import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';

import { Customer } from 'src/app/api/_models';
import { CustomerService, LoadingService } from 'src/app/api/_services';

import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-all-customer',
  templateUrl: './all-customer.component.html',
  styleUrls: ['./all-customer.component.css']
})

export class AllCustomerComponent implements OnInit {

  currentUser: any;
  customers: Customer[];
  customers$: Observable<Customer[]>;
  filteredCustomers$: Observable<Customer[]>;
  formGroup: FormGroup;

  actualPage: any;

  constructor(
    private router: Router, 
    private customerService: CustomerService, 
    private formBuilder: FormBuilder,  
    private dialog: MatDialog, 
    private toastr: ToastrService,
    public loader: LoadingService
  ) { this.formGroup = this.formBuilder.group({ filter: [''] }); }

  private getCustomers() {
    return of(this.customers).pipe(tap());
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.customerService.getCustomerByUserFk(+userId)
    .subscribe( data => {
      this.customers = data;
      this.formGroup = this.formBuilder.group({ filter: [''] });

      this.customers$ = this.getCustomers();

      this.filteredCustomers$ = this.formGroup.get('filter').valueChanges.pipe(
        startWith(''),
        withLatestFrom(this.customers$),
        map(([val, customers]) =>
          !val ? customers : customers.filter((x) => x.lastName.toLowerCase().includes(val.toLowerCase()))
        )
      );
    });
  }

  deleteCustomer(customer: Customer): void {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Etes vous sur de vouloir supprimer le client : ' + customer.lastName + ' ' + customer.firstName
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.customerService.delete(customer.id)
        .subscribe( data => {
          this.customers = this.customers.filter(u => u !== customer);
          this.ngOnInit();
          this.toastr.success("Suppression réussie");
        });
      }});
  };

  editCustomer(customer: Customer): void {
    window.localStorage.removeItem("editCustomerId");
    window.localStorage.setItem("editCustomerId", customer.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditCustomerComponent,{
      width: '640px',disableClose: true 
    });
  };

  AddCustomer(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddCustomerComponent,{
      width: '640px',disableClose: true 
    });
  };

}

