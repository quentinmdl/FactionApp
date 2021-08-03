import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BenefitService } from 'src/app/api/_services';
import { Invoice } from 'src/app/api/_models'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-benefit',
  templateUrl: './add-benefit.component.html',
  styleUrls: ['./add-benefit.component.css']
})
export class AddBenefitComponent implements OnInit {

  currentUser: any;
  addForm: FormGroup;
  wasFormChanged = false;
  loading = false;
  submitted = false;
  error = '';
  public breakpoint: number; // Breakpoint observer code

  
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddBenefitComponent>,
    private router: Router, 
    private benefitService: BenefitService, 
    private toastr : ToastrService,
    ) { }

   ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let invoiceFk = 1;

    this.addForm = this.formBuilder.group({
      product: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      hour: ['', Validators.required],
      // invoice: Invoice,
      invoiceFk: [invoiceFk, Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public addBenefit(): void {
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
    this.wasFormChanged = true;

    this.submitted = true;

        if (this.addForm.invalid) {
            return;
        }

    this.loading = true;

    this.benefitService.AddBenefit(this.addForm.value)
      .pipe(first())
      .subscribe( 
        data => {
          this.toastr.success('Ajout Réussi');
          this.close();
      },
      error => {
        this.toastr.error("Erreur d'ajout");
        this.error = error;
        this.loading = false;
      });
  }

  close() { // To cancel the dialog window
    this.dialogRef.close();
  }

}
