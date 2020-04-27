import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  
export class HomeComponent implements OnInit {
  public minDate: Date = new Date ("05/07/2017 2:00 AM");
  public maxDate: Date = new Date ("05/27/2017 11:00 AM");
  public dateValue: Date = new Date ("05/16/2017 5:00 AM");

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
