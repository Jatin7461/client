import { Component, inject, OnInit } from '@angular/core';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
books:any;
searchText:any;
bookServiceObj=inject(BooksService)

ngOnInit(): void {
  //to get books from our book service
  this.bookServiceObj.getAllBooks().subscribe(
    (res)=>{
      
      this.books=res},
  (error)=>{
    console.log(error)
  }
  );


  this.bookServiceObj.sortSubject.subscribe((sortCriterion:any)=>{//getting criteria from service
    this.books=this.bookServiceObj.sortBooks(sortCriterion);//sending the criteria back to service
  });
  this.bookServiceObj.priceFilterSubject.subscribe((price:any)=>{
    this.bookServiceObj.getAllBooks().subscribe((res)=>{//we are getting all books since ngOninit runs for once only
      this.books=res;
      this.books=this.bookServiceObj.getFilteredBooksByPrice(price);
    })
  })
  this.bookServiceObj.searchSubject.subscribe((searchString:any)=>{
this.searchText=searchString;//here home component is recieving the response from the search Subject
  })
}
}
