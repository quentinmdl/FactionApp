import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomerService } from 'src/app/api/_services';
import { Customer, User } from 'src/app/api/_models';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  currentUser: any;
  currentCustomer: Customer;
  loading = false;
  error = '';
  submitted = false;
  editForm: FormGroup;
  wasFormChanged = false;
  public name;
  public base64textString;
  public breakpoint: number; 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditCustomerComponent>,
    private router: Router, 
    private customerService: CustomerService, 
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    let customerId = window.localStorage.getItem("editCustomerId");
    this.editForm = this.formBuilder.group({
      id:[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessSector: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      logo: [this.base64textString],
      email: ['', Validators.required], 
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      addDate: ['', Validators.required]
    });
    this.customerService.getCustomerById(+customerId)
      .subscribe( data => {
        this.currentCustomer = data;
        this.editForm.setValue(this.currentCustomer); 
      });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  EditCustomer() {
    this.markAsDirty(this.editForm);
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup) {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.editForm.invalid) {
        return;
    }

    this.loading = true;
  
    this.editForm.controls['logo'].setValue(this.base64textString);

    this.customerService.update(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Modification(s) Réussie(s)');
          this.close();
          this.redirectTo('customers');
        },
        error => {
          this.toastr.error('Erreur lors des modifications');
          this.error = error;
          this.loading = false;
      });
  }

  handleUpload(event) {
    const files = event.target.files;
    const file = files[0];
    for (var i = 0; i < files.length; i++) {
      this.name = files[i].name;
    }  
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64textString = reader.result;
    };
  }

  close() { // To cancel the dialog window
    this.dialogRef.close();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
