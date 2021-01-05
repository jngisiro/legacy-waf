import { Component, OnInit } from '@angular/core';
import { Order } from '../models/order';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cart;
  total;
  user;

  loading = false;
  orderSubmitted = false;

  constructor(
    private productService: ProductService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.productService.cart.subscribe((cart) => {
      this.cart = cart;

      let sum = 0;
      this.cart.map((product) => {
        sum += product.price;
      });

      this.total = sum;
    });

    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  placeOrder() {
    this.loading = true;
    const products = this.cart.map((product) => product.id);

    let order: Order = {
      user: this.user.id,
      products: [...products],
      orderDate: new Date(),
      paymentMethod: 'Cash on Delivery',
    };

    this.productService.placeOrder(order).subscribe(
      (response) => {
        console.log('success');
        this.loading = false;
        this.orderSubmitted = true;

        this.productService.clearCart();
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }
}
