import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
currentProduct:any;
discountedPrice:any;
isProductInCart:any;
activatedRoute=inject(ActivatedRoute)
bookServiceObj=inject(BooksService)
cartServiceObj=inject(CartService)


ngOnInit(): void {
  this.activatedRoute.queryParams.subscribe((res)=>{
    this.currentProduct = this.bookServiceObj.getCurrentBook(res);
  });
  console.log(this.cartServiceObj.getDiscountedPrice(this.currentProduct));
  this.discountedPrice = this.cartServiceObj.getDiscountedPrice(this.currentProduct);
  this.isProductInCart = this.cartServiceObj.isProductInCart(this.currentProduct);
}

addToCart(book:any){    
  this.cartServiceObj.addProductToCart(book);
  this.isProductInCart = true;
}

}
