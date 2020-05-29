import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  private getTicketURL = "http://localhost:11010/api/booking/ticket/user/";

  userDisplayName = localStorage.getItem('_name_');
  loggedRole = localStorage.getItem('role');
  responseTickets: [{
    _id: '',
    train: '',
    wagon: '',
    class: '',
    departureDate: '',
    arrivalDate: '',
    price: Number
    }]
  constructor(
    public _authService: AuthService,
    private _login: LoginComponent,
    private router: Router,
    private toastr: ToastrService,
    private _auth: AuthService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAllTickets();
  }

  public getInfo (){
    return this._login.loginUserData
  }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }
  getAllTickets(){
    return this.http.get<any>(this.getTicketURL+localStorage.getItem('_id'), this.httpOptions)
      .subscribe(
        data => {this.responseTickets = data},
        res => { console.log(res)}
      )
  }






  formData =new FormData();

  name = 'Angular 4';
  url;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
        console.log(this.url);
        this.formData.append('url', this.url);    
        console.log(this.formData);
        
      }
    }
  }
  public delete(){
    this.url = null;
  }

  
}
