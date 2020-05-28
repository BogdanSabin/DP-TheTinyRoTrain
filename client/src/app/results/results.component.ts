import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  constructor(public _authService: AuthService, private _login: LoginComponent, private router: Router) { }
  userDisplayName = '';
  ngOnInit(): void {
    this.userDisplayName = sessionStorage.getItem('loggedUser');
  }

  public getInfo (){
    return this._login.loginUserData
  }


}
