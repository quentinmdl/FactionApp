
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../../api/_services';

import { ToastrService } from 'ngx-toastr';
import { MustMatch } from '../../../api/_helpers/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private toastr: ToastrService
    ) {
        //redirect to login after register
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {

        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            job: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            address: ['', Validators.required],
            city: ['', Validators.required],
            zip: ['', Validators.required],
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {

        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.toastr.success('Inscription Réussie');
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.toastr.error("Erreur lors de l'inscription");
                    this.error = error;
                    this.loading = false;
                });
    }
}
