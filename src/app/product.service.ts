import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck, tap } from 'rxjs/operators';
import { ProductResponse } from './models/productResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://waf-app.herokuapp.com/api/v1';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<ProductResponse>(`${this.baseUrl}/products`)
      .pipe(pluck('data', 'products'));
  }

  getProduct(id: string) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  placeOrder() {}

  getOrders() {}

  cancelOrder() {}
}
