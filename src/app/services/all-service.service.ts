import { Injectable, output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from '../models/user';
import { ProductModel } from '../models/product';
import { forkJoin } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

interface TokenResponse {
  token: string;  
}
interface ValidateReponse{
  response:string;
}


@Injectable({
  providedIn: 'root'
})

export class AllServiceService {

  private apiUrl="http://localhost:5265";

  constructor(private http:HttpClient) { }

  getProducts(): Observable<ProductModel[]>{
    return this.http.post<ProductModel[]>(this.apiUrl+"/getAllProducts", {}, httpOptions);
  }

  loginAuth(name:string, password:string): Observable<TokenResponse>{
    return this.http.get<TokenResponse>(this.apiUrl+`/generateToken?username=${name}&password=${password}`);
  }

  validateAuth(token:string): Observable<string>{
    console.log("token recived", token);
    return this.http.post<string>(this.apiUrl+`/validateToken?token=${token}`, {}, httpOptions);
  }

  addProduct(name:string, price:number): Observable<any>{
    return this.http.post<string>(this.apiUrl+`/addProduct?name=${name}&price=${price}`, {}, httpOptions);
  }


  getProductMin(min:number):Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.apiUrl+`/searchProductsByPrice?price=${min}&condition=%3E`, {}, httpOptions);
  }

  getProductMax(max:number):Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.apiUrl+`/searchProductsByPrice?price=${max}&condition=%3C`, {}, httpOptions);
  }


  getRangedProducts(min:number, max:number): Observable<ProductModel[]>{
    return this.http.post<ProductModel[]>(this.apiUrl+`/searchRangedProducts?minPrice=${min}&maxPrice=${max}`, {}, httpOptions);
  }



}
