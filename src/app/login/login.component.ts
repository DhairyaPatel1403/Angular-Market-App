import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators, FormSubmittedEvent, NgForm } from "@angular/forms";
import { NgStyle } from '@angular/common';
import { AllServiceService } from '../services/all-service.service';
import { userModel } from '../models/user';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, NgStyle],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private myService:AllServiceService){}

  token:string="";
  authorized:boolean=false;


  ngOnInit(){
    // this.myService.getProducts().subscribe((user)=>
    // this.users=user);

    const tokenStr = sessionStorage.getItem("token");

    
    if(this.token=="" && tokenStr){
      this.myService.validateAuth(tokenStr).subscribe((response)=> {if(response=="Valid User"){this.authorized=true}});
      this.token=tokenStr;
    }

  }

  userForm=new FormGroup({
    name: new FormControl("", [Validators.required, Validators.maxLength(50)]),
    password: new FormControl("", [Validators.required])
  })

  onSubmit(){

    if(this.userForm.value.name && this.userForm.value.password){
      this.myService.loginAuth(this.userForm.value.name, this.userForm.value.password).subscribe((token)=> {this.token=token.token, console.log(this.token), sessionStorage.setItem("token", this.token), this.authorized=true});
    }
  }


}
