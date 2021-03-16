import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  myName;
  myEmail;

  checkoutForm: FormGroup;

  loading = false;
  orderSubmitted = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.myEmail = user.email;
        this.myName = user.name;
      }
    });

    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(3)]],
      district: ['', [Validators.required, Validators.minLength(3)]],
      subcounty: ['', [Validators.required, Validators.minLength(3)]],
      parish: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.productService.cart.subscribe((cart) => {
      this.cart = cart;
      this.cart.map((product) => {
        product.qty = 1;
        product.initialPrice = product.price;
      });

      this.calculateTotal();
    });

    this.userService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        this.checkoutForm.controls['name'].setValue(user.name);
        this.checkoutForm.controls['email'].setValue(user.email);
      }
    });
  }

  placeOrder() {
    this.loading = true;
    const products = this.cart.map((product) => product.id);

    const {
      name,
      email,
      phone,
      district,
      subcounty,
      parish } = this.checkoutForm.value;

    let order = {
      name,
      email,
      phone,
      district,
      subcounty,
      parish,

      products: [...products],
      orderDate: new Date(),
      paymentMethod: 'Cash on Delivery',
      userInfo: this.checkoutForm.value,
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

  increment(product) {
    this.cart.map((pdt) => {
      if (pdt.name === product.name) {
        pdt.qty++;
        pdt.price = pdt.qty * pdt.initialPrice;
      }
    });

    this.calculateTotal();
  }

  decrement(product) {
    if (product.qty === 1) {
      this.cart = this.cart.filter((pdt) => pdt.name !== product.name);
      this.productService.removeFromCard(product);
    } else {
      this.cart.map((pdt) => {
        if (pdt.name === product.name) {
          pdt.qty--;
          pdt.price = pdt.qty * product.initialPrice;
        }
      });
    }

    this.calculateTotal();
  }

  calculateTotal() {
    let sum = 0;
    this.cart.map((product) => {
      sum += product.price;
    });

    this.total = sum;
  }
}
