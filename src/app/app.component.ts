import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'badaye-app';
  isCollapsed: boolean = true;

  constructor(
    private auth: UserService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.auth.autoLogin();
    this.productService.getCart();
  }
}
