import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Benefit } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

    constructor(private http: HttpClient) {
     }

    getAll() {
        return this.http.get<Benefit[]>(`${environment.apiUrl}/Benefit`);
    }

    getBenefitByInvoiceFk(invoiceId: number) {
        return this.http.get<Benefit[]>(`${environment.apiUrl}/Benefit/InvoiceFk/${invoiceId}`);
    }

    getBenefitById(id: number) {
        return this.http.get<Benefit>(`${environment.apiUrl}/Benefit/${id}`);
    }

    update(benefit: Benefit) {
        return this.http.put(`${environment.apiUrl}/Benefit/${benefit.id}`, benefit);
    }

    AddBenefit(benefit: Benefit) {
        return this.http.post(`${environment.apiUrl}/Benefit/Add`, benefit);
    }
    
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/Benefit/${id}`);
    }

}
