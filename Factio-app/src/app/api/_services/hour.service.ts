import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hour } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HourService {

    constructor(private http: HttpClient) {
    }

    getHourById(id: number) {
        return this.http.get<Hour>(`${environment.apiUrl}/Hour/${id}`);
    }

    getHourByUserFk(userId: number) {
        return this.http.get<Hour[]>(`${environment.apiUrl}/Hour/UserFk/${userId}`);
    }

    update(hour: Hour) {
        return this.http.put(`${environment.apiUrl}/Hour/${hour.id}`, hour);
    }

    addHour(hour: Hour) {
        return this.http.post(`${environment.apiUrl}/Hour/Add`, hour);
    }
    
}
