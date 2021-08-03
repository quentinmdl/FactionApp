import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
    
    constructor(private http: HttpClient) {
     }

    getAll() {
        return this.http.get<Customer[]>(`${environment.apiUrl}/Customer`);
    }

    getCustomerByUserFk(userId: number) {
        return this.http.get<Customer[]>(`${environment.apiUrl}/Customer/UserFk/${userId}`);
    }

    getCustomerByUserFkDate(userId: number, date: string) {
        return this.http.get<Customer[]>(`${environment.apiUrl}/Customer/UserFk/${userId}/Date/${date}`);
    }

    getCustomerById(id: number) {
        return this.http.get<Customer>(`${environment.apiUrl}/Customer/${id}`);
    }

    update(customer: Customer) {
        return this.http.put(`${environment.apiUrl}/Customer/${customer.id}`, customer);
    }

    AddCustomer(customer: Customer) {
        return this.http.post(`${environment.apiUrl}/Customer/Add`, customer);
    }
    
    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/Customer/${id}`);
    }

}
