import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {


  baseUrl='http://localhost:3500/books';
  books:any[]=[];//to store all the books

  searchText:any=''; //for searchBar
  searchSubject=new Subject();//for broadcasting
  filteredBooks:any;//to get the filtered books in our array according the sort 
  sortCriterion:any ;
  sortSubject=new Subject();

priceFilter:any;

//price filter subject to broadcast to home component
priceFilterSubject=new Subject();
  httpClient=inject(HttpClient)

  

  getAllBooks(){
return this.httpClient.get(this.baseUrl).pipe(map((book:any)=>{this.books=book;
  this.filteredBooks=this.books;
  
return book;
}
))
//return this.httpClient.get<any[]>(this.baseUrl)
  }


  
  //sorting functionality
 
  getSortCriterion(criterion:any){//to get only the criteria
this.sortCriterion=criterion;
//this to send what type of sort we have to do to the home component
this.sortSubject.next(this.sortCriterion)
  }





  sortBooks(criteria:any){
    switch(criteria){
      case 'Price(Low to High)':
        this.filteredBooks.sort((a:any,b:any)=>{
          if(a.price<b.price){
            return -1;//move a to low index
          }
          if(a.price>b.price){
            return 1;//move a to greater index
          }
          return 0;//maintain current order
        });
        break;
        case 'Price(High to Low)':
          this.filteredBooks.sort((a:any,b:any)=>{
            if(a.price<b.price){
              return 1;
            }
            if(a.price>b.price){
              return -1;
            }
            return 0;
          });
          break;
      
    }
    return this.filteredBooks;
  }




  
getPriceFilter(price:any){
  this.priceFilter=price;
  this.priceFilterSubject.next(this.priceFilter);
}
  
getFilteredBooksByPrice(price:any){
  return this.filteredBooks=this.books.filter((book:any)=>{
    return book.price<=price;
  })
}

getCurrentBook(id:any){
  return this.books.find((book:any)=>{
    return book.isbn===id.isbn;
  })
}

getSearchString(searchText:any){
  this.searchText=searchText;//recieving the search text from header
this.searchSubject.next(this.searchText)
}

}
