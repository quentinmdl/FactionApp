
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { NoteService } from 'src/app/api/_services';
import { ToastrService } from 'ngx-toastr';
import { Note, User } from 'src/app/api/_models';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'mmmm yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'mmmm yyyy'
  },
};


@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class EditNoteComponent implements OnInit {

  currentUser: any;
  editForm: FormGroup;
  wasFormChanged = false;
  loading = false;
  submitted = false;
  error = '';
  currentNote : Note;
  notes : Note[];
  public breakpoint: number; 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditNoteComponent>,
    private router: Router, 
    private noteService: NoteService, 
    private toastr : ToastrService
  ) { }

  ngOnInit() {

    let noteId = window.localStorage.getItem("editNoteId");
    this.editForm = this.formBuilder.group({
      id:[],
      title: ['', Validators.required],
      content: ['', Validators.required],
      addDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.noteService.getNoteById(+noteId)
    .pipe(first())
    .subscribe(
      data => {
        this.currentNote = data;
        this.editForm.setValue(this.currentNote);       
      });
      this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    }

    EditNote() {
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
      this.wasFormChanged = true;
    
      this.submitted = true;
    
          if (this.editForm.invalid) {
              return;
          }
    
      this.loading = true;
    
      this.noteService.update(this.editForm.value)
        .pipe(first())
        .subscribe( 
          data => {
            this.toastr.success('Modification(s) Réussie(s)');          
            this.close();
            this.redirectTo('notes');
        },
        error => {
          this.toastr.error("Erreur de modification");
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
    
    
  
