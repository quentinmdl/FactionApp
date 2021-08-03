import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { BusinessService } from 'src/app/api/_services';
import { User, Business } from 'src/app/api/_models';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css']
})
export class EditBusinessComponent implements OnInit {

  currentUser: any;
  currentBusiness : Business;
  business : Business[];

  loading = false;
  error = '';
  submitted = false;
  editForm: FormGroup;
  wasFormChanged = false;

  public breakpoint: number; 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditBusinessComponent>,
    private router: Router, 
    private route: ActivatedRoute,
    private businessService: BusinessService, 
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.editForm = this.formBuilder.group({
      id:[],
      tva: ['', Validators.required],
      urssaf: [''],
      taxe: [''],
      siret: ['', Validators.required],
      ape: ['', Validators.required],
    });
    this.businessService.getBusinessByUserFk(+userId)
    .pipe(first())
    .subscribe( data => {
      this.currentBusiness = data;
      this.editForm.setValue(this.currentBusiness); 
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  } 
    
  EditBusiness() {
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

    this.businessService.update(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Modification(s) Réussie(s)');
          this.close();
          this.redirectTo('business');
        },
        error => {
          this.toastr.error('Erreur lors des modifications');
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


