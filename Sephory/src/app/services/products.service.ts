import { Injectable } from '@angular/core';
import { API_URL } from './api.config';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../models/productCategory.model';
import { Product } from '../models/product.model';
import { firstValueFrom } from 'rxjs';
import { DataPage } from '../models/dataPage.model';


export interface ProductFilter {
  pageNumber: number,
  searchName: string,
  minPrice: number,
  maxPrice: number,
  categories: number[]
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  async getCategories(): Promise<ProductCategory[]> {
    return await firstValueFrom(
      this.http.get<ProductCategory[]>(`${API_URL}/products/getCategories`)
    )
  }
  async getProducts(filter: ProductFilter): Promise<DataPage<Product>> {
    console.log(JSON.stringify(filter.categories));
    const params = {
      ...filter,
      categories: JSON.stringify(filter.categories)
    };

    return await firstValueFrom(
      this.http.get<DataPage<Product>>(`${API_URL}/products/getProducts`, { params })
    );
  }
}
