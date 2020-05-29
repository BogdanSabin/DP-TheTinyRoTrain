import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', ]
})
export class LoginComponent implements OnInit {

  loginUserData = {
    email: '',
    password: ''
   }
  constructor(private _auth: AuthService, private _router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  showSuccess(){
    this.toastr.success("Your have been logged in !!");
  }
  showInfo(){
    this.toastr.info("Please confirm your email in order to log in !");
  }
  showError(){
    this.toastr.error("The data could not been submited !");
  }


  loginUser () {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role',res.role)
        localStorage.setItem('_id',res._id)
        localStorage.setItem('_name_',res.name)
        console.log(res);
        
        if(res.role === 'master'){
          this._router.navigate(['/admin'])
            .then(() => {
            window.location.reload();
          })
        }
        else if(res.role === 'user' || res.role === 'admin'){
          this._router.navigate(['/home'])
            .then(() => {
              window.location.reload();
            })
        }
      },
      err => {console.log(err)
        if(err.status == 200){
          this.showSuccess()
        }
        else if(err.status == 401){
          this.showInfo()
        }
        else{
          this.showError()
        }
      }
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
