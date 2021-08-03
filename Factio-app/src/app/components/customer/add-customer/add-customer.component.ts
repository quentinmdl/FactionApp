import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { CustomerService } from 'src/app/api/_services';
import { User } from 'src/app/api/_models';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  currentUser: any;
  addForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  public name;
  public base64textString;
  public breakpoint: number; // Breakpoint observer code

  public addDate: string;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private customerService: CustomerService, 
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddCustomerComponent>,
    private toastr : ToastrService,
    private http: HttpClient
    ) {  }


  ngOnInit(): void {
   
    // Get Actual Date
    let actualYear = new Date()
    let yearDate = actualYear.getFullYear();
    let monthDate = actualYear.getMonth()+1;
    if (monthDate < 10) { 
      this.addDate = yearDate.toString() + '0' + monthDate.toString();
    } else {
      this.addDate = yearDate.toString() + monthDate.toString();
    }

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      logo: [this.base64textString],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      businessSector: ['', Validators.required],
      addDate: [this.addDate, Validators.required],
      user: User,
      userFk: [userId, Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public addCustomer(): void {
    this.markAsDirty(this.addForm);
  }

  // tslint:disable-next-line:no-any
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  onSubmit() {

    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.addForm.controls['logo'].setValue(this.base64textString);

    this.customerService.AddCustomer(this.addForm.value)
      .pipe(first())
      .subscribe( 
        data => {
          this.toastr.success('Ajout Réussi');
          this.close();
          this.redirectTo('customers');
      },
      error => {
        this.toastr.error("Erreur d'ajout");
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
