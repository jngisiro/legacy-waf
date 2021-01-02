import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart;
  total;
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.cart.subscribe((cart) => {
      this.cart = cart;

      let sum = 0;
      this.cart.map((product) => {
        sum += product.price;
      });

      this.total = sum;
    });
  }
}
