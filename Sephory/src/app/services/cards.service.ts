import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpClient } from '@angular/common/http';
import { API_URL, ApiResponse } from './api.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  async getCards(): Promise<ApiResponse<Card[]>> {
    return await firstValueFrom(
      this.http.get<ApiResponse<Card[]>>(`${API_URL}/cards/getAll`)
    );
  }

  async createCard(owner: string, number: string, cvc: string, expire: Date): Promise<ApiResponse<Card>> {
    return await firstValueFrom(
      this.http.post<ApiResponse<Card>>(`${API_URL}/cards/create`, { owner, number, cvc, expire })
    );
  }
  async deleteCard(card: Card): Promise<ApiResponse<void>> {
    const params = { card: card.id };

    return await firstValueFrom(
      this.http.delete<ApiResponse<void>>(`${API_URL}/cards/delete`, { params })
    );
  }
}
