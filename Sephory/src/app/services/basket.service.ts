import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { API_URL } from './api.config';
import { AuthService } from './auth.service';
import { BasketProduct } from '../models/basketProduct.model';
import { Product } from '../models/product.model';
import { ApiResponse } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  #basketObserver: BehaviorSubject<BasketProduct[]> = new BehaviorSubject<BasketProduct[]>([]);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getBasketContent();
  }

  async getBasketContent(): Promise<BasketProduct[]> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<BasketProduct[]>>(`${API_URL}/basket/getContent`)
    );

    const content = response.success ? response.data : [];
    this.#basketObserver.next(content);
    return content;
  }
  observeBasketContent(): Observable<BasketProduct[]> {
    return this.#basketObserver.asObservable();
  }
  async addToBasket(product: Product) {
    const newContent = await firstValueFrom(
      this.http.post<ApiResponse<BasketProduct[]>>(`${API_URL}/basket/add`, { product: product.id })
    );

    console.log(newContent);
    this.#basketObserver.next(newContent.success ? newContent.data : []);
  }
  async dropFromBasket(product: Product) {
    const params = { product: product.id };
    const newContent = await firstValueFrom(
      this.http.delete<ApiResponse<BasketProduct[]>>(`${API_URL}/basket/drop`, { params })
    );

    this.#basketObserver.next(newContent.success ? newContent.data : []);
  }
  async clearBasket(): Promise<ApiResponse<void>> {
    this.#basketObserver.next([]);
    return await firstValueFrom(
      this.http.delete<ApiResponse<void>>(`${API_URL}/basket/clear`)
    );
  }
}
