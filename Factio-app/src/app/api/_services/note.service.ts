import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Note } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

    constructor(private http: HttpClient) { 
    }

    getAll() {
        return this.http.get<Note[]>(`${environment.apiUrl}/Note`);
    }

    getNoteByUserFk(userId: number) {
        return this.http.get<Note[]>(`${environment.apiUrl}/Note/UserFk/${userId}`);
    }

    getNoteById(id: number) {
        return this.http.get<Note>(`${environment.apiUrl}/Note/${id}`);
    }

    update(note: Note) {
        return this.http.put(`${environment.apiUrl}/Note/${note.id}`, note);
    }

    AddNote(note: Note) {
        return this.http.post(`${environment.apiUrl}/Note/Add`, note);
    }
    
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/Note/${id}`);
    }

}
