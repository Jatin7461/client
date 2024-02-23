import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrl: './price-details.component.css'
})
export class PriceDetailsComponent implements OnInit {

  cartItems:any[]=[];
  cartItemsPrice:any;
  cartItemsDiscount:any;
  deliveryCharge:any;
  cartServiceObj=inject(CartService)


  ngOnInit(): void {
    this.cartItems=this.cartServiceObj.getAllCartItems();//we will have to find bill of every book in cart 
    this.getBillingDetails();//this is for loading 
    this.cartServiceObj.cartSubject.subscribe((items:any)=>{
      this.cartItems=items;
      this.getBillingDetails();//again we have called so that if we inc/dec it can update price
    })
  }
  getBillingDetails(){
    let billingDetails=this.cartServiceObj.getBilling(this.cartItems);
    this.cartItemsPrice=billingDetails.price;
    this.cartItemsDiscount=billingDetails.discount;
    this.deliveryCharge=billingDetails.delivery;
  }
}
