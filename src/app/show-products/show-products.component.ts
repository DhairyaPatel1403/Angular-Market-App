import { Component, SimpleChanges } from '@angular/core';
import { AllServiceService } from '../services/all-service.service';
import { ProductModel } from '../models/product';
import { NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-products',
  imports: [NgStyle, FormsModule],
  templateUrl: './show-products.component.html',
  styleUrl: './show-products.component.css'
})
export class ShowProductsComponent {

  constructor(private myService:AllServiceService){}

  authorized:boolean=false;

  products:ProductModel[]=[];

  minPrice:number=0;
  maxPrice:number=10000000;

  cart:number=0;

  ngOnInit(){
    const token = sessionStorage.getItem("token");
    if(token){
      this.myService.validateAuth(token).subscribe((response)=> { console.log(response); if(response=="Valid User"){this.authorized=true}});
    }

    this.myService.getProducts().subscribe((products)=> { console.log(products); this.products = products});
  }

  rangeSearch(){
    this.myService.getRangedProducts(this.minPrice, this.maxPrice).subscribe((products)=> { console.log(products); this.products = products});
  }

  addToCart(){
    this.cart+=1;
  }

}
