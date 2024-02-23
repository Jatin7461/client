import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import {login} from '../models/login'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {
  loginForm:FormGroup;
  router=inject(Router)
  userServiceObj=inject(UserService)
  type:string="password";
  isText:boolean=false;
  eyeIcon:string="fa-eye-slash"
  httpClientObj=inject(HttpClient)
  
  ngOnInit():void{
    this.loginForm=new FormGroup({
      username:new FormControl('',Validators.required),
    
      password:new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  
   
  }
  
  hideShowPass(){
    this.isText=!this.isText;
    this.isText?this.eyeIcon="fa-eye": this.eyeIcon="fa-eye-slash"
    this.isText? this.type="text":this.type="password"
  }
      
  
  get username(){
    return this.loginForm.get('username')
  }
 
  
  get password(){
    return this.loginForm.get('password')
  }
  
  onSubmit(){
    this.httpClientObj.get<login[]>("http://localhost:3000/users").subscribe({
      next:(res)=>{
        //find user in the response array whose username and password matches the input value
        const user=res.find((a:any)=>{

          return a.username===this.loginForm.value.username && a.password===this.loginForm.value.password;
        })

        //checking if a matching user was found or not
        if(user){
          this.router.navigate(['/home']);
          this.userServiceObj.setUserLoginStatus(true)//this is done for header component
        }
        else{
          alert("user not found with these credentials")
        }
      },
      error:(error)=>{
        console.log(error)
        this.loginForm.reset();
      }
    })
 
  }
}
