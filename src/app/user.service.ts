import { HttpClient } from '@angular/common/http';
import { Injectable , inject} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpClient=inject(HttpClient)
  userLoginStatus=new BehaviorSubject<boolean>(false)//to broadcast the status to header
  
  setUserLoginStatus(value:boolean){
this.userLoginStatus.next(value)
  }

  getUserLoginStatus(){//this is used by header component 
   return this.userLoginStatus.asObservable()
  }

  userLogout(){
    this.setUserLoginStatus(false)
  }
  

  //Create User(user registration in json)
 

    
}
