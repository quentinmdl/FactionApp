import { Component, OnInit , Inject} from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';


import { User } from 'src/app/api/_models';
import { UserService } from 'src/app/api/_services';

import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../api/_helpers/must-match';

@Component({
  selector: 'app-password-edit-user',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.css']
})
export class EditPasswordComponent implements OnInit {

  currentUser: User;
  users: User;
  loading = false;
  error = '';
  submitted = false;
  wasFormChanged = false;
  editPasswordForm: FormGroup;
  public breakpoint: number; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private userService: UserService, 
    private toastr: ToastrService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditPasswordComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {

    let userId = window.localStorage.getItem("editPasswordUserId");
    this.editPasswordForm = this.formBuilder.group({
      id:[],
      username: ['', Validators.required],
      job: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      token: ['', Validators.required], 
      customers: ['', Validators.required],
      notes: ['', Validators.required],
      invoices: ['', Validators.required],
      businesses: ['', Validators.required],
      hours: ['', Validators.required]
    }, 
    { validator: MustMatch('password', 'confirmPassword') }
    );
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.currentUser = data;
        this.editPasswordForm.setValue(data);
      });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
   
  }
 
  EditPasswordUser() {
    this.markAsDirty(this.editPasswordForm);
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  private markAsDirty(group: FormGroup) {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  onSubmit() {

    this.submitted = true;

    this.loading = true;

    let password = this.editPasswordForm.controls["password"].value;
    this.editPasswordForm.controls['password'].setValue(password);
    this.editPasswordForm.controls['confirmPassword'].setValue(password);

    this.userService.updatePassword(this.editPasswordForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Modification Réussie');
          this.closeNote();
          this.redirectTo('profile');
        },
        error => {
          this.toastr.error('Erreur lors de la modification');
          this.error = error;
          this.loading = false;
      });
  }

  closeNote() { 
    this.dialogRef.close();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
