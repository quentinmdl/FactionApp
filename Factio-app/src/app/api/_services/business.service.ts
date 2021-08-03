import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Business } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

    constructor(private http: HttpClient) {
     }

    getAll() {
        return this.http.get<Business[]>(`${environment.apiUrl}/Business`);
    }

    getBusinessById(id: number) {
        return this.http.get<Business>(`${environment.apiUrl}/Business/${id}`);
    }

    getBusinessByUserFk(userId: number) {
        return this.http.get<Business>(`${environment.apiUrl}/Business/UserFk/${userId}`);
    }

    addBusiness(business: Business) {
        return this.http.post(`${environment.apiUrl}/Business/Add`, business);
    }

    update(business: Business) {
        return this.http.put(`${environment.apiUrl}/Business/${business.id}`, business);
    }
    
}
