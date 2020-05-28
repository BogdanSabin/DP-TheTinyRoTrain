import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators, FormArray,FormGroup } from '@angular/forms';
import { Data, Stations } from '../data';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  routeForm: FormGroup;
  trainForm: FormGroup;
  toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
  }

  toggleSidenav(id){
    var x = document.getElementById(id);
      if(x.className.indexOf("w3-show") == -1){
        x.className = x.className + "w3-show";
      }
      else{
        x.className = x.className.replace("w3-show", "");
      }
  }

  private _createRouteURL = "http://localhost:11010/api/resource/route/create";
  private _createWagonURL = "http://localhost:11010/api/resource/wagon/create";
  private _createStationURL = "http://localhost:11010/api/resource/station/create";
  private _createTrainURL = "http://localhost:11010/api/resource/train/create";


  private _getAllRoutesURL = "http://localhost:11010/api/resource/route/all";
  private _getAllStationsURL = "http://localhost:11010/api/resource/station/all";
  private _getAllWagonsURL = "http://localhost:11010/api/resource/wagon/all";
  private _getAllTrainsURL = "http://localhost:11010/api/resource/train/all"
  private _getAllUsersURL = "http://localhost:11010/api/resource/user/all";

  private _getOneStationURL ="http://localhost:11010/api/resource/station/getStation/";
  private _getOneRouteURL = "http://localhost:11010/api/resource/route/getRoute/";
  private _getOneWagonURL = "http://localhost:11010/api/resource/wagon/getWagon/";
  private _getOneTrainURL = "http://localhost:11010/api/resource/train/getTrain/"
  private _getOneUserURL = "http://localhost:11010/api/resource/user/getone/";

  private _updateStationURL = "http://localhost:11010/api/resource/station/update/";
  private _updateRouteURL = "http://localhost:11010/api/resource/route/update/";
  private _updateWagonURL = "http://localhost:11010/api/resource/wagon/update/";
  private _updateTrainURL = "http://localhost:11010/api/resource/train/update/";
  private _updateUserURL = "http://localhost:11010/api/resource/user/update/";

  private _deleteStationURL = "http://localhost:11010/api/resource/station/delete/";
  private _deleteRouteURL = "http://localhost:11010/api/resource/route/delete/";
  private _deleteWagonURL = "http://localhost:11010/api/resource/wagon/delete/";
  private _deleteTrainURL = "http://localhost:11010/api/resource/train/delete/";
  private _deleteUserURL = "http://localhost:11010/api/resource/user/delete/";

  private _changeRoleURL = "http://localhost:11010/api/resource/user/change/";
  private _getRolesURL = "http://localhost:11010/api/resource/user/roles";
  private _getClassesURL = "http://localhost:11010/api/resource/wagon/types/all";
  
  stations = {
    name: '',
    timeToWait: ''
  }

  Routes = {
    name : '',
    departureDate: Date,
    arrivalDate: Date,
    stations: [{
      name: '',
      arrival: Date
    }]
  }

  Wagons = {
    name: '',
    totalSeatsNo: '',
    type: '',
    price: ''
  }

  Users = {
    role: '',
    firstName: '',
    lastName: '',
    email: '',
  }

  uUsers ={
    firstName: '',
    lastName: ''
  }
  
  Trains = {
    name: '',
    wagons: [{
      name: ''
    }],
    route: ''
  }

  responseStations: [{
    _id: '',
    name: '',
    timeToWait: '',
    __v: ''
  }]

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

  responseWagons: [{
    _id: '',
    name: '',
    totalSeatsNo: '',
    type: '',
    price: ''
  }]

  responseTrains: [{
    _id: '',
    name: '',
    wagons: [],
    route: ''
  }]

  responseUsers: [{
    _id: '',
    role: '',
    firstName: '',
    lastName: '',
    email: ''
  }]
  userDisplayName = sessionStorage.getItem('loggedUser');






constructor(private formBuilder: FormBuilder,private cd: ChangeDetectorRef, private toastr: ToastrService, private _router: Router, private _auth: AuthService,private http: HttpClient) { }

//options for google atucomplete
options = {
  componentRestrictions: { country: 'RO' }
}
public handleAddressChange(address: any) {
  //get name from input
  this.stations.name = address.name;
}

  showSuccess(){
    this.toastr.success("Your submision has been made !");
  }
  showError(){
    this.toastr.error("The data could not been submited !");
  }

  ngOnInit() {
    this.routeForm = this.formBuilder.group({
      stationsName: new FormArray([])
  });
    this.routeForm.valueChanges.subscribe(data=>{
      this.Routes.stations=data.stationsName;
    })

    this.trainForm = this.formBuilder.group({
      wagonsName: new FormArray([])
    });
    this.trainForm.valueChanges.subscribe(data=>{
      this.Trains.wagons=data.wagonsName;
    })

    if(this._auth.loggedAdmin()){
      return true;
    }
    this._router.navigate(['/home'])


  }

  get w(){
    return this.trainForm.controls;
  }
  get wagonsName(){
    return this.w.wagonsName as FormArray
  }

  addNewWagonName(){
    this.wagonsName.push(
      this.formBuilder.group({
        name: ['', []]
      })
    );
  }

  removeNewWagonName(i:number){
    const control =<FormArray>this.trainForm.controls['wagonsName'];
    control.removeAt(i);
   }

  get f() {
    return this.routeForm.controls;
  }
  get stationsName() {
    return this.f.stationsName as FormArray;
  }

  addNewStationName() {
    this.stationsName.push(
      this.formBuilder.group({
        name: ['', []],
        arrival: ['', []]
      })
    );
  }

  removeNewStationName(i:number){
    const control =<FormArray>this.routeForm.controls['stationsName'];
    control.removeAt(i);
   }






 




 
  







  
  showTab = 0;
  tabToggle(index){
    this.showTab = index;
  }
  callCreateStation(){
    this.createStation()
    this.refresh()
  }
  refresh(){
    this.stations.name = '';
    this.stations.timeToWait = '';
    
    this.Routes.name='';
    this.Routes.departureDate;
    this.Routes.arrivalDate;
    this.routeForm.reset();

    this.Wagons.name='';
    this.Wagons.price='';
    this.Wagons.totalSeatsNo='';
    this.Wagons.type='';
  }

  callAddALL(id){
    if (id == 1){
      this.tabToggle(1);
      
    }
    else if (id == 2){
      this.tabToggle(2);
      this.getAllStations();
    }
    else if (id == 3){
      this.tabToggle(3);
      this.getClasses();
    }
    else if (id == 4){
      this.tabToggle(4);
      this.getAllWagons();
      this.getAllRoutes();
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
      this.getAllTrains();
    }
    else if(id == 5){
      this.tabToggle(100);
      this.getAllUsers();
    }
    else if(id == 6){
      this.tabToggle(102);
      this.getRoles();
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
    else if (id == 3){
      this.tabToggle(11);
      this.getOneWagon(_id);
    }
    else if(id == 4){
      this.tabToggle(12);
      this.getOneTrain(_id);
    }
    else if(id == 5){
      this.tabToggle(101);
      this.getOneUser(_id);
      this.getRoles();
    }
  }

  calldelete(id){
    if(id==1){
      this.tabToggle(5);
    }
  }



  /* FUNCTIONS TO CREATE */
  
  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    })
  }

  createStation(){
    this.tabToggle(1)
    return this.http.post(this._createStationURL, this.stations, this.httpOptions)
    .subscribe(
      res => {
        this.refresh()
        this.showSuccess()
        
      },
      err => {
        console.log(err)
        this.showError();
      }
    )
    
  }

  createRoute(){
    return this.http.post(this._createRouteURL, this.Routes, this.httpOptions)
      .subscribe(
        res=> {
          console.log(this.Routes.name)
          this.showSuccess()
          this.refresh()
        },
        (err) => {console.log(err)
          this.showError();
        }
      )
  }

  createWagon(){
    return this.http.post(this._createWagonURL, this.Wagons, this.httpOptions)
    .subscribe(
      res => {
        console.log(this.Wagons)
        this.refresh()
        this.showSuccess()
      },
      err => {
        this.showError()
        this.showError()
      }
    )
  }
  train={
    name: '',
    route: '',
    wagon: []
  }
  createTrain(){
    console.log(this.Trains)
    this.train.wagon = this.Trains.wagons.map((m)=>{
      return m.name;
    })
    this.train.name=this.Trains.name;
    this.train.route=this.Trains.route;
    
    return this.http.post(this._createTrainURL, this.train, this.httpOptions)
      .subscribe(
        res=> {
          console.log(this.train)
          this.showSuccess()
          this.refresh()
        },
        (err) => {console.log(err)
          this.showError();
        }
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

  getAllTrains(){
    return this.http.get<any>(this._getAllTrainsURL, this.httpOptions)
      .subscribe(
        data => {this.responseTrains = data},
        res => { console.log(res)}
      )
  }

  getAllUsers(){
    return this.http.get<any>(this._getAllUsersURL, this.httpOptions)
      .subscribe(
        data => {this.responseUsers = data},
        res => { console.log(res)}
      )
  }

  roles = []
    getRoles(){
    return this.http.get<any>(this._getRolesURL, this.httpOptions)
      .subscribe(
        data => {this.roles = data
        console.log(this.roles)},
        res => { console.log(res)}
      )
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

  getOneWagon(id){
    return this.http.get<any>(this._getOneWagonURL+id, this.httpOptions)
      .subscribe(
        res => {
          this.Wagons = res,
          this.current_id =id
        }
      )
  }

  getOneUser(id){
    return this.http.get<any>(this._getOneUserURL+id, this.httpOptions)
      .subscribe(
        res => {
          this.Users = res;
          this.uUsers.firstName = res.firstName;
          this.uUsers.lastName = res.lastName;
          this.current_id =id;
        }
      )
  }

  getOneTrain(id){
    return this.http.get<any>(this._getOneTrainURL+id, this.httpOptions)
      .subscribe(
        res => {
          this.Trains = res,
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
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
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
          this.showSuccess();
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
        }
      )
  }

  updateWagon(_id){
    return this.http.post(this._updateWagonURL+_id,this.Wagons, this.httpOptions)
      .subscribe(
        res => {
          console.log(res)
          console.log(this.Routes);
          console.log(this.current_id);
          this.showSuccess()
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
        }
      )
  }

  updateTrain(_id){
    return this.http.post(this._updateTrainURL+_id,this.Trains, this.httpOptions)
      .subscribe(
        res => {
          console.log(res)
          console.log(this.Trains);
          console.log(this.current_id);
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
        }
      )
  }

  updateUser(_id){
    return this.http.post(this._updateUserURL+_id,this.uUsers, this.httpOptions)
      .subscribe(
        res => {
          console.log(res)
          console.log(this.Users);
          console.log(this.current_id);
          this.showSuccess()
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
        }
      )
  }

  changeRole(_id){
    return this.http.post(this._changeRoleURL+this.Users.role+"/"+_id, this.httpOptions)
      .subscribe(
        res => {
          this.showSuccess()
        },
        err => {
          if(err.status == 200)
          {
            this.showSuccess();
          }
          else{
            this.showError();
          }         
        }
      )
  }
  deleteStation(id){
    return this.http.delete(this._deleteStationURL+id,this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
         
        },
        err => {
          if(err.status == 200){
            this.showSuccess();
            this.getAllStations();
            this.tabToggle(5);
          }
          else{
            this.showError();
          }
          
        }
      )
  }

  deleteRoute(id){
    return this.http.delete(this._deleteRouteURL+id,this.httpOptions)
      .subscribe(
        res => {console.log(res);

        },
        err => {
          if (err.status == 200)
          {
            this.tabToggle(6);
            this.showSuccess();
            this.getAllRoutes();
          }
          else{
            this.showError();
          }
          
        }
      )
  }


  deleteWagon(id){
    return this.http.delete(this._deleteWagonURL+id,this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.showSuccess();
        },
        err => {
          if (err.status == 200)
          {
            this.tabToggle(7);
            this.showSuccess();
            this.getAllWagons();
          }
          else{
            this.showError();
          }
        }
      )
  }

  deleteTrain(id){
    return this.http.delete(this._deleteTrainURL+id,this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.showSuccess();
        },
        err => {
          if (err.status == 200)
          {
            this.tabToggle(7);
            this.showSuccess();
            this.getAllTrains();
          }
          else{
            this.showError();
          }
        }
      )
  }

  deleteUser(id){
    return this.http.delete(this._deleteUserURL+id,this.httpOptions)
      .subscribe(
        res => {
          console.log(res);
          this.showSuccess();
        },
        err => {
          if (err.status == 200)
          {
            this.showSuccess();
            this.getAllUsers();
          }
          else{
            this.showError();
          }
        }
      )
  }

}
