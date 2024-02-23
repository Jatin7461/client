import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
cartItems:any[]=[]
cartServiceObj=inject(CartService)
router=inject(Router)

ngOnInit(): void {
  this.cartItems=this.cartServiceObj.getAllCartItems()//putting all the books that are in cart to the arrray
}
goToHome(){
  this.router.navigate(['/home'])
}
}
