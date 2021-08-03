import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { BusinessService } from 'src/app/api/_services';
import { User, Business } from 'src/app/api/_models';

@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrls: ['./add-business.component.css']
})
export class AddBusinessComponent implements OnInit {

  currentUser: any;
  currentBusiness : Business;
  business : Business[];
  loading = false;
  error = '';
  submitted = false;
  addForm: FormGroup;
  wasFormChanged = false;

  public breakpoint: number; 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddBusinessComponent>,
    private router: Router, 
    private businessService: BusinessService, 
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.addForm = this.formBuilder.group({
      tva: ['', Validators.required],
      urssaf: [''],
      taxe: [''],
      siret: ['', Validators.required],
      ape: ['', Validators.required],
      user: User,
      userFk: [userId, Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  } 

  public addBusiness(): void {
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


    this.businessService.addBusiness(this.addForm.value)
    .pipe(first())
    .subscribe( 
      data => {
        this.toastr.success('Ajout Réussi');
        this.close();
        this.redirectTo('business');
    },
    error => {
      this.toastr.error("Erreur d'ajout");
      this.error = error;
      this.loading = false;
    });
  
  }

  close() { 
    this.dialogRef.close();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}

