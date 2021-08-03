import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../api/_services';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  emailForm : FormGroup
  loading = false;
  submitted = false;
  error = '';

  constructor(  private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.emailForm = this.formBuilder.group({
      email: ['', Validators.required],
  
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.emailForm.controls; }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.emailForm.invalid) {
        return;
    }

    this.loading = true;

    let userInfo = this.emailForm.value;
    // this.authenticationService.sendForgotPasswordEmail(userInfo.Email).subscribe(
    //   error => {
    //     this.error = error;
    //     this.loading = false;
    // });     
    
  }

}
