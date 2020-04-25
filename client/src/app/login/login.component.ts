import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
   }
/*
   obiect = {
     statii: [{
       name: ''

     }],
     timp ajungere: ''
   }*/
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  /*loginUser() {
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token)
          this._router.navigate(['/home'])
          /*
          sessionStorage.setItem('loggedUser', this.loginUserData.email)
          if(this.loginUserData.email == "admin" && this.loginUserData.password == "admin"){
            this._router.navigate(['/admin'])
          }
          else{
            this._router.navigate(['/home'])
          }
        },
        err => console.log(err)
      )
      
      console.log(this.loginUserData)
  }*/

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    ) 
  }
}
