import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  name:string;
  public isCollapsed = true;

  constructor(private activatedRoute:ActivatedRoute, private router:Router) {
    
   }

  ngOnInit(): void {

    this.getProduct();

  }

  getProduct():void {



  }

}
