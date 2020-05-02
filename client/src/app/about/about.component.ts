import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  userDisplayName = '';
  userStorePassword = {}
  constructor(public _authService: AuthService, private _login: LoginComponent) {}

  ngOnInit() {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
  }

  public getInfo (){
    return this._login.loginUserData
  }


}
