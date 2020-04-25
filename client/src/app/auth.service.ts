import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  constructor(private http: HttpClient, private _router: Router) { }
  public registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }
  public loginUser(user){
    return this.http.post<any>(this._loginUrl, user)
  }

  public loggedIn() {
    return !!localStorage.getItem('token')
  }

  public logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }

  public getToken() {
    return localStorage.getItem('token')
  }
}
