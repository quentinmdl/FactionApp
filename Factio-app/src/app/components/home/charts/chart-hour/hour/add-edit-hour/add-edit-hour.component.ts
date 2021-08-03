import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { HourService } from 'src/app/api/_services';
import { User, Hour } from 'src/app/api/_models';

@Component({
  selector: 'app-add-edit-hour',
  templateUrl: './add-edit-hour.component.html',
  styleUrls: ['./add-edit-hour.component.css']
})
export class AddEditHourComponent implements OnInit {

  currentUser: any;
  currentHourId: Hour[];
  currentHour: Hour;
  addEditForm: FormGroup;
  id: string;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  error = '';
  public breakpoint: number; // Breakpoint observer code

  weeks: Hour[];
  hourId: any;
  firstDay: string;
  lastDay: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddEditHourComponent>,
    private toastr : ToastrService,
    private hourService : HourService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.hourService.getHourByUserFk(+userId)
    .subscribe( dataId => {
      this.currentHourId = dataId; 
      if(this.currentHourId.length > 0) {
        this.hourId = this.currentHourId[0].id 
        
        this.hourService.getHourById(+this.hourId)
        .subscribe( data => {
        this.currentHour = data;
        if (this.currentHour) {
              this.isAddMode = true;             
              this.addEditForm.patchValue(data); 
            }       
        })
      }
    })

    this.addEditForm = this.formBuilder.group({
      id:[],
      week1: ['', Validators.required],
      week2: ['', Validators.required],
      week3: ['', Validators.required],
      week4: ['', Validators.required],
      week5: ['', Validators.required],
      user: User,
      userFk: [userId, Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public addEditHour(): void {
    this.markAsDirty(this.addEditForm);
  }

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

    if (this.addEditForm.invalid) {
      return;
    }

    this.loading = true;

    if (this.isAddMode == false) {
      this.addHour();
    } else {
        this.updateHour();
    }
  }

  private addHour() {
    this.hourService.addHour(this.addEditForm.value)
      .pipe(first())
      .subscribe( 
        data => {
          this.toastr.success('Ajout Réussi');
          this.router.navigate(['home']);
          this.close();
      },
      error => {
        this.toastr.error("Erreur d'ajout");
        this.error = error;
        this.loading = false;
      });
  }

  private updateHour() {
    this.hourService.update(this.addEditForm.value)
    .pipe(first())
    .subscribe( 
      data => {
        this.toastr.success('Modification Réussie');
        this.router.navigate(['home']);
        this.close();
    },
    error => {
      this.toastr.error("Erreur des modifications");
      this.error = error;
      this.loading = false;
    });

  }

  close() { // To cancel the dialog window
    this.dialogRef.close();
  }
  
}
