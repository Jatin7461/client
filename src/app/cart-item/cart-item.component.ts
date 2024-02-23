import { Component, inject, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent implements OnInit {
@Input() item:any;// to get from cart component
discountedPrice:any;
itemPrice:any;

cartServiceObj=inject(CartService)

getPriceDetails(item:any){
  this.discountedPrice=this.cartServiceObj.getPriceDetailsInCartItem(item).discountedPrice;
  this.itemPrice=this.cartServiceObj.getPriceDetailsInCartItem(item).price;
}

ngOnInit(): void {

  //console.log(this.item)
  this.getPriceDetails(this.item);//we are calling it here to get the price in the strating itself
}


decItemCount(item:any){
this.cartServiceObj.decProdCount(item);
this.getPriceDetails(item);
}



incItemCount(item:any){
  this.cartServiceObj.incProdCount(item);
  this.getPriceDetails(item);
}

removeItem(item:any){
this.cartServiceObj.removeItemFromCart(item);

}
}
