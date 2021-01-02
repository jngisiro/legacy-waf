import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { Product } from './models/Product';
import { ProductResponse } from './models/productResponse';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://waf-app.herokuapp.com/api/v1';

  cart = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http
      .get<ProductResponse>(`${this.baseUrl}/products`)
      .pipe(pluck('data', 'products'));
  }

  getProduct(id: string) {
    return this.http.get(`${this.baseUrl}/products/${id}`);
  }

  placeOrder(order) {
    return this.http.post(`${this.baseUrl}/orders`, {});
  }

  getOrders() {
    return this.http.get(`${this.baseUrl}/orders`, {});
  }

  cancelOrder(id: string) {
    return this.http.patch(`${this.baseUrl}/orders`, {});
  }

  addToCart(product: Product) {
    // let products: Product[];

    const products: Product[] =
      JSON.parse(localStorage.getItem('userCart')) || [];
    products.push(product);

    localStorage.setItem('userCart', JSON.stringify(products));
    this.cart.next(products);
  }

  removeFromCard(product: Product) {
    let products: Product[] = JSON.parse(localStorage.getItem('userCart'));

    products = products.filter((item) => item.id !== product.id);
    localStorage.setItem('userCart', JSON.stringify(products));
    this.cart.next(products);
  }

  getCart() {
    const products: Product[] = JSON.parse(localStorage.getItem('userCart'));
    this.cart.next(products);
  }
}
