import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/api/_services';
import { User } from 'src/app/api/_models';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser: User;
  user: User;
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
    private router: Router, 
    private userService: UserService, 
    private toastr: ToastrService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditUserComponent>,
    private http: HttpClient
  ) { }

  ngOnInit() {

    let userId = window.localStorage.getItem("editUserId");
    this.editForm = this.formBuilder.group({
      id:[],
      username: ['', Validators.required],
      job: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      photo: [this.base64textString],
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
    });
    this.userService.getUserById(+userId)
      .subscribe( data => {
        this.currentUser = data;
        this.editForm.setValue(data);
      });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  EditUser() {
    this.markAsDirty(this.editForm);
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

    let password = this.editForm.controls["password"].value;
    this.editForm.controls['confirmPassword'].setValue(password);


    let currentPhoto = this.currentUser.photo;
    if (this.base64textString != null) {
      this.editForm.controls['photo'].setValue(this.base64textString);
    } else {
      this.editForm.controls['photo'].setValue(currentPhoto);
    }
     
    this.userService.update(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.toastr.success('Modification(s) réussie(s)');
          this.closeNote();
          this.redirectTo('profile');
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

  closeNote() { 
    this.dialogRef.close();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

}
