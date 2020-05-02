import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', ]
})
export class LoginComponent implements OnInit {

  loginUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
   }
/*
   obiect = {
     statii: [{
       n310413 ''

     }],
     timp ajungere: ''
   }*/
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role',res.role)
        if(res.role === 'master'){
          this._router.navigate(['/admin'])
        }
        else{
          this._router.navigate(['/home'])
        }
        
      },
      err => console.log(err)
    ) 
    sessionStorage.setItem('loggedUser', this.loginUserData.email)
    console.log(this.loginUserData.email);
    
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
