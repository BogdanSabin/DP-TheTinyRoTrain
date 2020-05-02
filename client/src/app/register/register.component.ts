import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
   }
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/login'])
      },
      
      err => console.log(err)
    )
    sessionStorage.setItem('loggedUser', this.registerUserData.lastName)
  }

  passwordType: string = 'password';
  passswordShown: boolean = false;
  visibility(){
    if(this.passswordShown){
      this.passswordShown = false;
      this.passwordType = 'password';
    }else{
      this.passswordShown = true;
      this.passwordType = 'text'
    }
  }
}
