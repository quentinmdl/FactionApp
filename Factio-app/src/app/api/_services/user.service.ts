import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient) { }

    getUserById(id: number) {
      return this.http.get<User>(`${environment.apiUrl}/User/${id}`);
    }

    update(user: User) {
      return this.http.put(`${environment.apiUrl}/User/${user.id}`, user);
    }

    updatePassword(user: User) {
      return this.http.put(`${environment.apiUrl}/User/changePassword/${user.id}`, user);
    }

    getUserByToken(token: string) {
      return this.http.get<User>(`${environment.apiUrl}/User/GetUserByToken/${token}`);
    }
}
