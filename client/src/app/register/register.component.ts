import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private _auth: AuthService, private _router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess(){
    this.toastr.success("Success registration !!");
  }
  showInfo(){
    this.toastr.info("Please confirm your email in order to log in !");
  }
  showError(){
    this.toastr.error("Please fill up all fields corectly");
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/login'])
      },
      
      err => {console.log(err)
        if(err.status == 200){
          this.showSuccess();
          this.showInfo();
        }
        else{
          this.showError();
        }
      }
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
