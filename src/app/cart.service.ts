import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts:any[]=[];//this will store all the books we add in our cart
 
cartSubject=new Subject();


//to add books that we are adding to cart component
//this will be called from product component
  addProductToCart(product:any){
let currentBook={...product,count:1};//to restructure the product obj 
this.cartProducts.push(currentBook);
this.cartSubject.next(this.cartProducts)//the whole is been send
  }

  getAllCartItems(){
    return this.cartProducts;
  }

  //for cart items component we need discounted price and item price
  getPriceDetailsInCartItem(product:any){
let priceDetails={
  discountedPrice:(product.price*product.count)-(product.discount)/100*(product.price*product.count),
  price:product.price*product.count
}
return priceDetails;
  }

  incProdCount(product:any){//we have several books in our cartItem array now we have to inc the count of the book obj that we are sending thats why we need isbn
let index=this.cartProducts.findIndex((item)=>{
  return item.isbn===product.isbn;

});
this.cartProducts[index].count++;
this.getPriceDetailsInCartItem(product);//to uodate the price as cont has inc
this.cartSubject.next(this.cartProducts)//to update the counter
  }

  decProdCount(product:any){
    let index=this.cartProducts.findIndex((item)=>{
      return item.isbn===product.isbn;
    
    });
    this.cartProducts[index].count--;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProducts);
      
  }


  removeItemFromCart(product:any){
    let removeConfirm=window.confirm("Are you sure?");
    if(removeConfirm){
      let index=this.cartProducts.findIndex((item)=>{
        return item.isbn===product.isbn;
      });
      this.cartProducts.splice(index,1);
      this.cartSubject.next(this.cartProducts);
    }
  }

  getBilling(cartItems:any){
    let billingDetails={
      price:0,
      discount:0,
      delivery:200

    }
    cartItems.forEach((item:any)=>{//since cart item is an array 
      billingDetails.price=billingDetails.price+(item.price*item.count);
      billingDetails.discount=billingDetails.discount+((item.discount/100*item.price)*item.count);
      
    });
  return billingDetails;
  }

  isProductInCart(product:any){
    let book=this.cartProducts.find((p:any)=>{
      return p.isbn===product.isbn;
    });
    if(book){
      return true;
    }else{
      return false;
    }
  }


  getDiscountedPrice(currentItem:any){
    return currentItem.price-(currentItem.discount)/100*currentItem.price;
  }
}
