import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE} from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';

import { Note } from 'src/app/api/_models';
import { NoteService } from 'src/app/api/_services';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';

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
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class ShowNoteComponent implements OnInit {


  public breakpoint: number; // Breakpoint observer code
  wasFormChanged = false;
  currentNote: Note;
  notes: Note[];

  constructor(
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ShowNoteComponent>,
    private router: Router, 
    private noteService: NoteService, 
    private toastr : ToastrService
  ) { }

  ngOnInit() {

    let noteId = window.localStorage.getItem("showNoteId");
    this.noteService.getNoteById(+noteId)
    .subscribe( note => {
      this.currentNote = note;
    });
    this.breakpoint = window.innerWidth <= 600 ? 1 : 2; // Breakpoint observer code
    
    }
 
    deleteNote(note: Note): void {
      const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmation',
          message: 'Etes vous sur de vouloir supprimer la tâche : ' + note.title
        }
      });
      confirmDialog.afterClosed().subscribe(result => {
        if (result === true) {
          this.noteService.delete(note.id)
          .subscribe( data => {
            this.close();
            window.location.reload();
            this.toastr.success("Suppression réussie");
          });
      }});  
    };

    close() { 
      this.dialogRef.close();
    }
}
    
    
  
