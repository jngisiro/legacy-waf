import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.cart.subscribe((cart) => (this.cart = cart));
  }

  removeFromCart(product: Product) {
    this.productService.removeFromCard(product);
  }

  onCheckout() {
    console.log('running');
    this.router.navigate(['checkout']);
  }
}
