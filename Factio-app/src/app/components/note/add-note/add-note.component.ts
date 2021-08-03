import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { delay, first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { NoteService } from 'src/app/api/_services';
import { User } from 'src/app/api/_models'
import { ToastrService } from 'ngx-toastr';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})

export class AddNoteComponent implements OnInit {

  currentUser: any;
  addForm: FormGroup;
  wasFormChanged = false;
  loading = false;
  submitted = false;
  error = '';
  public breakpoint: number;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNoteComponent>,
    private router: Router, 
    private noteService: NoteService, 
    private toastr : ToastrService,
    ) { }

   ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      addDate: [new Date()],
      endDate: [new Date()],
      user: User,
      userFk: [userId, Validators.required]
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
  }

  public addNote(): void {
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

    this.noteService.AddNote(this.addForm.value)
      .pipe(first())
      .subscribe( 
        data => {
          this.toastr.success('Ajout Réussi');
          this.close();
          this.redirectTo('notes');
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
