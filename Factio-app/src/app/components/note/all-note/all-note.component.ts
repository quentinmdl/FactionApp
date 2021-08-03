import { Component, OnInit , Inject, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, startWith, tap, withLatestFrom } from 'rxjs/operators';
import { Note } from 'src/app/api/_models';
import { NoteService, LoadingService } from 'src/app/api/_services';

import { AddNoteComponent } from '../add-note/add-note.component';
import { EditNoteComponent } from '../edit-note/edit-note.component';
import { ShowNoteComponent } from '../show-note/show-note.component';

import { ToastrService } from 'ngx-toastr';
import { MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../modals/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-all-note',
  templateUrl: './all-note.component.html',
  styleUrls: ['./all-note.component.css']
})
export class AllNoteComponent implements OnInit {

  currentUser: any;
  notes: Note[];
  notes$: Observable<Note[]>;
  formGroup: FormGroup;

  actualPage: any;
  
  constructor(
    private router: Router, 
    private noteService: NoteService,  
    private dialog: MatDialog, 
    private route: ActivatedRoute, 
    private toastr: ToastrService,
    public loader: LoadingService
  ) { }

  private getNotes() {
    return of(this.notes).pipe(tap());
  }

  ngOnInit() {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let userId = this.currentUser.infos.id;

    this.noteService.getNoteByUserFk(+userId)
      .subscribe( data => {
        this.notes = data;
        this.notes$ = this.getNotes();
      });
      
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
          this.ngOnInit();
          this.toastr.success("Suppression réussie");
        });
      }});
  };

  editNote(note: Note) {
    window.localStorage.removeItem("editNoteId");
    window.localStorage.setItem("editNoteId", note.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(EditNoteComponent,{
      width: '640px',disableClose: true 
    });
  };

 
  AddNote() {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(AddNoteComponent,{
      width: '640px',disableClose: true 
    });
  }

  showNote(note: Note) {
    window.localStorage.removeItem("showNoteId");
    window.localStorage.setItem("showNoteId", note.id.toString());
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(ShowNoteComponent,{
      width: '640px',disableClose: false 
    });
  }
}

