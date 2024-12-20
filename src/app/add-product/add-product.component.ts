import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormSubmittedEvent, NgForm } from "@angular/forms";
import { AllServiceService } from '../services/all-service.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, NgStyle],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  productForm=new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    price: new FormControl(0, [Validators.required]),
  })

  constructor(private myService:AllServiceService){}

  addStatus:boolean=false;

  authorized:boolean=false;

  ngOnInit(){
    const token = sessionStorage.getItem("token");
    if(token){
      this.myService.validateAuth(token).subscribe((response)=> { console.log(response); if(response=="Valid User"){this.authorized=true}});
    }
  }

  onSubmit(){
    if(this.productForm.value.name && this.productForm.value.price)
    this.myService.addProduct(this.productForm.value.name, this.productForm.value.price).subscribe((response)=> { var resStatus = response as boolean; if(resStatus){this.addStatus = true} });
  }
}
