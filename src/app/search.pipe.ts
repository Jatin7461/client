import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(books: any[], searchText: any): any {
    if(!searchText){//if searchText is empty we need to flash all the books
    return books;
  }
return books.filter((book:any)=>{
  return book.title.toLowerCase().includes(searchText.toLowerCase());
})
}
}
