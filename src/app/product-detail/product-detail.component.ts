import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.productService.getProduct(params['id']).subscribe(
        (product: Product) => {
          this.loading = false;
          this.product = product;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }

  onProceed() {
    this.productService.addToCart(this.product);
    this.router.navigate(['/checkout']);
  }
}
