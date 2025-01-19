import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URL, ApiResponse } from './api.config';
import { User } from '../models/user.model';
import { firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface LoginResponse extends ApiResponse<void> {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #isConnected: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.#isConnected.next(localStorage.getItem('user') != null);
    this.http.get(`${API_URL}/auth/checkConnection`).toPromise()
      .then((result) => {
        this.#isConnected.next(true);
      }).catch(() => {
        this.#isConnected.next(false);
      });
  }

  getUser(): User | null {
    const data = localStorage.getItem('user');
    if (!data)
      return null;
    else {
      return JSON.parse(data);
    }
  }
  get connected(): boolean {
    return this.#isConnected.value;
  }

  observeConnectionState(): Observable<any> {
    return this.#isConnected.asObservable();
  }

  disconnect() {
    this.http.delete(`${API_URL}/auth/disconnect`);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.#isConnected.next(false);
  }

  async updatePassword(password: string): Promise<LoginResponse> {
    return await firstValueFrom(
      this.http.put<LoginResponse>(`${API_URL}/auth/updatePassword`, { password })
    );
  }

  async register(firstname: string, lastname: string, email: string, password: string): Promise<LoginResponse> {
    const registerData = { firstname, lastname, email, password };
    return await firstValueFrom(
      this.http.post<LoginResponse>(`${API_URL}/auth/register`, registerData)
    );
  }

  async connect(email: string, password: string): Promise<LoginResponse> {
    const loginData = { email, password };

    const result = await firstValueFrom(
      this.http.post<LoginResponse>(`${API_URL}/auth/connect`, loginData)
    );
    if (result?.success && isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
    }

    this.#isConnected.next(true);

    return result;
  }
}
