import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { CartService } from '../cart.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

//to store whatever we write in search bar
  searchText:any='';
cartItemCount:any;
//sort by menu
isSortMenuVisible:boolean=false;
criteria:any[]=['Price(Low to High)','Price(High to Low)']//array for sort criteria 
cartServiceObj=inject(CartService)
bookServiceobj=inject(BooksService)
userServiceObj=inject(UserService)
status:boolean;//for enabling login/logout




ngOnInit(): void {
  //the cartitem is the array of thee books that we are adding in cart
  this.cartServiceObj.cartSubject.subscribe((cartItems:any)=>{
this.cartItemCount=cartItems.length;// for adding count over cart item
  })
  this.userServiceObj.getUserLoginStatus().subscribe({//geting status of login or logout from userservice
    next:(userLoginStatus)=>this.status=userLoginStatus
  })
}


showSortMenu(){
  this.isSortMenuVisible=!this.isSortMenuVisible //to show sort menu
}



sortBooks(criterion:any){
this.bookServiceobj.getSortCriterion(criterion)
}




searchBook(searchText:any){
this.bookServiceobj.getSearchString(searchText); //passing the value of text to book service where we have getSearchString
}
}
