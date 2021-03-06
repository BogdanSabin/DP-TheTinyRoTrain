import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { setMaxListeners } from 'cluster';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  private _buyTicketURL = "http://localhost:11010/api/booking/book/";
  private _getResultsURL = "http://localhost:11010/api/booking/find/solution";

  userDisplayName = '';
  searchs = {
    stationStart: '',
    stationEnd: '',
    numberOfTickets: '',
    wagonClass: '',
    departureData: ''
  }

  responseSearch = [{
    trainName: '',
    trainId: '',
    wagonName: '',
    wagonId: '',
    price: Number,
    seats: [],
    route: '',
    distance: Number,
    departureDate: Date,
    class: ''
  }]

  tickets= {
    train: '',
    wagon: '',
    class: '',
    seats: [],
    departureDate: '',
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
    this.searchs.stationStart=localStorage.getItem('stationstart');
    this.searchs.stationEnd=localStorage.getItem('stationsent');
    this.searchs.numberOfTickets= localStorage.getItem('numberoftickets');
    this.searchs.departureData=localStorage.getItem('departuredata');
    this.searchs.wagonClass=localStorage.getItem('classWagon');
    this.getResults();
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

  buyTicket(trainid,wagonid,classid,seatsid,departuredateid,priceid){
    this.tickets.train=trainid;
    this.tickets.wagon=wagonid;
    this.tickets.class=classid;
    this.tickets.seats=seatsid;
    this.tickets.departureDate=departuredateid;
    this.tickets.price=priceid;
    return this.http.post(this._buyTicketURL+localStorage.getItem('_id'),this.tickets, this.httpOptions)
      .subscribe(
        res => { 
          this.router.navigate(['/user']).then(()=>{
            window.location.reload();
          });
        },
        err => {
          this.showError();
        }
      )
  }

  getResults(){
    return this.http.post<any>(this._getResultsURL, this.searchs, this.httpOptions)
      .subscribe(
        data =>{
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" + data);
          console.log(data);
          this.responseSearch = data;
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2")
          console.log(this.responseSearch);
        },
        res => { 
          console.log("BBBBBBBBBBBBBBB" + res)
          //this.responseSearch = res
        }
      )
  }


}
