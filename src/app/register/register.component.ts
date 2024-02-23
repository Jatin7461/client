import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
registerForm:FormGroup;
router=inject(Router)
type:string="password";
isText:boolean=false;
eyeIcon:string="fa-eye-slash"

httpClient=inject(HttpClient)

ngOnInit():void{
  this.registerForm=new FormGroup({
    username:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(6)])
  })

 
}

registerData(registerForm:FormGroup){

  this.httpClient.post('http://localhost:3000/users',registerForm.value).subscribe({//subscribe method called on the observable return by http

  next:(res)=>
  {
    alert("You are now registered");
    this.router.navigate(['login']);
  },
  
  error: (err)=>{
    alert("Something Went Wrong")

  }
})
   

}

hideShowPass(){//for visibility of password
  this.isText=!this.isText;
  this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash"
  this.isText? this.type="text":this.type="password"
}
    

get username(){
  return this.registerForm.get('username')
}
get email(){
  return this.registerForm.get('email')
}

get password(){
  return this.registerForm.get('password')
}

// onSubmit(){
//   console.log(this.registerForm.value)
  

// }
goToLogin(){
  this.router.navigate(['/login'])
}
}
