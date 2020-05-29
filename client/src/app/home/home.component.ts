import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  
export class HomeComponent implements OnInit {
  public minDate: Date = new Date ("05/07/2017 2:00 AM");
  public maxDate: Date = new Date ("05/27/2017 11:00 AM");
  public dateValue: Date = new Date ("05/16/2017 5:00 AM");

  private _getClassesURL = "http://localhost:11010/api/resource/wagon/types/all";


  userDisplayName = '';
  userStorePassword = {}
  
  searchs = {
    stationStart: '',
    stationEnd: '',
    numberOfTickets: '',
    wagonClass: '',
    departureData: Date
  }


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _router: Router,
    private _auth: AuthService,
    private http: HttpClient,
    public _authService: AuthService,
    private _login: LoginComponent,
    ) {}

  ngOnInit() {
    this.getClasses();
    console.log(this.classes);
    
    //this.userDisplayName = sessionStorage.getItem('loggedUser');
    this.userDisplayName = localStorage.getItem('_name_');
  }

  public getInfo (){
    return this._login.loginUserData
  }

  searchResults(){
    if(localStorage.getItem('token') != null){
      this._router.navigate(['/results'])
    }
    else{
      this._router.navigate(['/login'])
    }    
  }
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }

  classes = []
  getClasses(){
    return this.http.get<any>(this._getClassesURL, this.httpOptions)
    .subscribe(
      data => {this.classes = data
      console.log(this.classes)},
      res => { console.log(res)}
    )
  }

  localSearch(){
    localStorage.setItem('stationstart',this.searchs.stationStart);
    localStorage.setItem('stationsent',this.searchs.stationEnd);
    localStorage.setItem('numberoftickets',this.searchs.numberOfTickets);
    localStorage.setItem('departuredata',this.searchs.departureData.toString());

  }

}
