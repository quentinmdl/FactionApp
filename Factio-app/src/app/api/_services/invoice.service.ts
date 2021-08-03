import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) {
     }

    getAll() {
        return this.http.get<Invoice[]>(`${environment.apiUrl}/Invoice`);
    }

    getInvoiceByUserFk(userId: number) {
        return this.http.get<Invoice[]>(`${environment.apiUrl}/Invoice/UserFk/${userId}`);
    }

    getInvoiceByUserFkDate(userId: number, date: string) {
        return this.http.get<Invoice[]>(`${environment.apiUrl}/Invoice/UserFk/${userId}/Date/${date}`);
    }

    getInvoiceById(id: number) {
        return this.http.get<Invoice>(`${environment.apiUrl}/Invoice/${id}`);
    }

    update(invoice: Invoice) {
        return this.http.put(`${environment.apiUrl}/Invoice/${invoice.id}`, invoice);
    }

    AddInvoice(invoice: Invoice) {
        return this.http.post(`${environment.apiUrl}/Invoice/Add`, invoice);
    }
    
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/Invoice/${id}`);
    }

}