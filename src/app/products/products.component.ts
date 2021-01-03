import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  name: string;
  public isCollapsed = true;
  products: Product[];
  loading = false;

  constructor(private http: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.http.getProducts().subscribe(
      (response) => {
        this.loading = false;
        this.products = response;
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  addToCart(product: Product) {
    this.http.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.http.removeFromCard(product);
  }

  getProduct(): void {}

  onDetails(product: Product) {
    console.log('Navigating');
    this.router.navigate(['product', product.id]);
  }
}
