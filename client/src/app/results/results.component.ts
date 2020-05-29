import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private _buyTicketURL = "http://localhost:11010/api/booking/book/";

  userDisplayName = '';

  responseClasses: [{
    trainName: 'dada',
    trainid: 'dada',
    wagon: 'dada',
    wagonid: 'dada',
    price: 'dada',
    seats: ["dd"],
    departureDate: Date,
    arrivalDate: Date
  }]

  tickets= {
    train: '5ed01fac0ab5f035430baff4',
    wagon: '5eaa8f3d2659b84a5257395b',
    class: 'i',
    seats: [
      's11',
      's2'
    ],
    departureDate: '2020-05-29T14:40:43.290z',
    arrivalDate: '2020-05-29T20:40:43.290z',
    price: 20
  }


  constructor(
    public _authService: AuthService,
    private _login: LoginComponent,
    private router: Router,
    private toastr: ToastrService,
    private _auth: AuthService,
    private http: HttpClient
      ) { }

  ngOnInit() {
    this.getInfo()
    this.userDisplayName = localStorage.getItem('_name_');   
  }

  public getInfo (){
    return this._login.loginUserData
  }


  showSuccess(){
    this.toastr.success("You have bought a ticket!");
  }
  showError(){
    this.toastr.error("Invalid transaction. No more places");
  }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }

  buyTicket(){
    return this.http.post(this._buyTicketURL+localStorage.getItem('_id'),this.tickets, this.httpOptions)
      .subscribe(
        res => { 
          this.showSuccess();
        },
        err => {
          this.showError();
        }
      )
  }


}
