import { Routes } from '@angular/router';
import { ShowProductsComponent } from './show-products/show-products.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'show-products', component:ShowProductsComponent},
    {path:'add-product', component:AddProductComponent},
];
