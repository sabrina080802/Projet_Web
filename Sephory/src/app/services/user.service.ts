import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { API_URL } from './api.config';
import { User } from '../models/user.model';
import { LoginResponse } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  async updateUserProfil(user: User) {
    const data = {
      email: user.email, phone: user.phone,
      firstname: user.firstname, lastname: user.lastname,
      address: user.address, city: user.city, postal_code: user.postal_code, country: user.country
    };

    localStorage.setItem('user', JSON.stringify(data));
    return await firstValueFrom(
      this.http.put<LoginResponse>(`${API_URL}/user/updateProfil`, data)
    );
  }
}
