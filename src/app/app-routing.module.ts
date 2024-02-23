import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { UiComponent } from './ui/ui.component';

const routes: Routes = [{
  path:'ui',
  component:UiComponent
},{
  path:'home',
  component:HomeComponent
},{
   
path:'register',
component:RegisterComponent
},
{
path:'login',
component:LoginComponent},{
  path:'cart',
  component:CartComponent
},{
  path:'product-details',
  component:ProductDetailsComponent
},{
  path:'',
  redirectTo:"ui",
  pathMatch:'full'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
