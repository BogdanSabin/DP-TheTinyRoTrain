import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { Data, Stations } from '../data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  private _createRouteURL = "http://localhost:11010/api/resource/route/create";
  private _createWagonURL = "http://localhost:11010/api/resource/wagon/create";
  private _createStationURL = "http://localhost:11010/api/resource/station/create";

  private _getAllRoutesURL = "http://localhost:11010/api/resource/route/all";
  private _getAllStationsURL = "http://localhost:11010/api/resource/station/all";
  private _getAllWagonsURL = "http://localhost:11010/api/resource/wagon/all";

  private _getOneStationURL ="http://localhost:11010/api/resource/station/getStation/";
  private _getOneRouteURL = "http://localhost:11010/api/resource/route/getRoute/";

  private _updateStationURL ="http://localhost:11010/api/resource/station/update/";
  private _updateRouteURL = "http://localhost:11010/api/resource/route/update/";

  private _deleteStationURL = "http://localhost:11010/api/resource/station/delete/";


  Routes = {
    name : '',
    departureDate: '',
    arrivalDate: '',
    stations: [{
      name: '',
      arrival: ''
    }]
  }
  responseRoutes: [{
    _id: '',
    name: '',
    departureDate: '',
    arrivalDate: '',
    stations: [
      {
        name: '',
        arrival: ''
      }
    ]
  }]
  responseStations: [{
    _id: '',
    name: '',
    timeToWait: '',
    __v: ''
  }]

  responseWagons: [{
    _id: '',
    name: '',
    totalSeatsNo: '',
    type: '',
    price: ''
  }]

  Wagons = {
    name: '',
    totalSeatsNo: '',
    type: '',
    price: ''
  }
  
  stations = {
    name: '',
    timeToWait: ''
  }

 //Object for temporary storing FORM DATA
 routeForm = this.fb.group({
  name: ['', Validators.required],
  departureDate: [''],
  arrivalDate: [''],

  stationsName: this.fb.array([
    this.fb.control('')
  ])
});




counter: number;
onSubmit(){
  var firstname = this.routeForm.controls['name'].value;
  var departureDate = this.routeForm.get('departureDate').value;
  var arrivalDate = this.routeForm.get('arrivalDate').value;

  console.log("first name is : " +firstname);
  console.log("second name is: "+departureDate);
  console.log("arrivalDate is: "+arrivalDate);

  //console.log("Mobile 1 is :" + this.routeForm.get(['mobiles','0']).value);
  this.counter=0;
  for(let station of this.stationsName.controls)
  {
    console.log("Stations is :"+this.routeForm.get(['stationsName',this.counter]).value);
    this.counter = this.counter+1;
  }

  
}

get stationsName(){
  return this.routeForm.get('stationsName') as FormArray; 
}


addNewStationName(){
  this.stationsName.push(this.fb.control(''));
  
}





 




 
  constructor(private fb: FormBuilder, private _router: Router, private _auth: AuthService,private http: HttpClient) { }

  ngOnInit() {
    if(this._auth.loggedAdmin()){
      return true;
    }
    this._router.navigate(['/home'])

    /*this.routeForm = this.fb.group({
      name: '',
      departureDate: '',
      arrivalDate: '',
      stations: this.fb.array([this.createStat() ])

    });*/
  }







  /*deleteStations(index) {
    this.allStations.removeAt(index);
  }*/
  
  showTab = 0;
  tabToggle(index){
    this.showTab = index;
  }

  callAddALL(id){
    if (id == 1){
      this.tabToggle(1);
      
    }
    else if (id == 2){
      this.tabToggle(2);
      this.getAllStations();
    }
    if (id == 3){
      this.tabToggle(3);
    }
    else if (id == 4){
      this.tabToggle(4);
    }

  }
  callALL(id){
    if (id == 1) {
      this.tabToggle(5);
      this.getAllStations();
    }
    else if (id == 2) {
      this.tabToggle(6);
      this.getAllRoutes();
    }
    else if (id == 3) {
      this.tabToggle(7);
      this.getAllWagons();

    }
    else if (id ==4 ) {
      this.tabToggle(8);
    } 
  }
  callUpdates(id, _id){
    if(id==1){
      this.tabToggle(9);
      this.getOneStation(_id);
    }
    else if ( id == 2){
      this.tabToggle(10);
      this.getOneRoute(_id);
      this.getAllStations();
    }
  }

  calldelete(id,_id){
    if(id==1){
      this.deleteStation(_id);
      this.tabToggle(5);
    }
  }
  
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }

  createStation(){
    return this.http.post(this._createStationURL, this.stations, this.httpOptions)
    .subscribe(
      res => {
        console.log(this.stations)
      },
      err => console.log(err)
    )
  }

  createRoute(){
    return this.http.post(this._createRouteURL, this.Routes, this.httpOptions)
      .subscribe(
        res => {
          console.log(this.Routes)
        },
        err => console.log(err)
      )
  }

  createWagon(){
    return this.http.post(this._createWagonURL, this.Wagons, this.httpOptions)
    .subscribe(
      res => {
        console.log(this.Wagons)
      },
      err => console.log(err)
    )
  }

  getAllStations(){
    return this.http.get<any>(this._getAllStationsURL, this.httpOptions)
      .subscribe(
        data => {this.responseStations = data},
        res => {console.log(res);
        }
      )
  }

  getAllRoutes(){
    return this.http.get<any>(this._getAllRoutesURL,this.httpOptions)
      .subscribe(
        data => {this.responseRoutes = data},
        res => {console.log(res);
         }
      )
  }

  getAllWagons(){
    return this.http.get<any>(this._getAllWagonsURL, this.httpOptions)
      .subscribe(
        data => {this.responseWagons = data},
        res => { console.log(res)}
      )
  }

  current_id: ''

  getOneStation(id){
    return this.http.get<any>(this._getOneStationURL+id, this.httpOptions)
      .subscribe(
        res => {
          this.stations = res,
          this.current_id = id
          
          
        }
      )
  }

  getOneRoute(id){
    return this.http.get<any>(this._getOneRouteURL+id, this.httpOptions)
      .subscribe(
        res => {
          this.Routes = res,
          this.current_id =id
        }
      )
  }

  updateStation(_id){
    return this.http.post(this._updateStationURL+_id,this.stations, this.httpOptions)
      .subscribe(
        res => {
          console.log(res)
          console.log(this.stations);
          console.log(this.current_id);
        }
      )
  }

  updateRoute(_id){
    return this.http.post(this._updateRouteURL+_id,this.Routes, this.httpOptions)
      .subscribe(
        res => {
          console.log(res)
          console.log(this.Routes);
          console.log(this.current_id);
        }
      )
  }

  deleteStation(id){
    return this.http.delete(this._deleteStationURL+id,this.httpOptions)
      .subscribe(
        res => {console.log(res);
        }
      )
  }

}
