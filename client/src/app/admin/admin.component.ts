import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Data, Stations } from '../data';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent implements OnInit {
  
  
  stations=[
    {id: 1, name:"Arad"},
    {id: 2, name:"Timisoara"},
    {id: 3, name:"Bucuresti"},
    {id: 4, name:"Severin"},
    {id: 5, name:"Deva"},
  ]

  routes=[
    {id: 1, name:"ruta1"},
    {id: 2, name:"ruta2"},
    {id: 3, name:"ruta3"},
    {id: 4, name:"ruta4"},
    {id: 5, name:"ruta5"},
  ]

  vagons=[
    {id: 1, name:"vagon1"},
    {id: 2, name:"vagon2"},
    {id: 3, name:"vagon3"},
    {id: 4, name:"vagon4"},
    {id: 5, name:"vagon5"},
  ]
 


 
  constructor(private fb: FormBuilder) { }

  routeForm: FormGroup;
  index2: number;

  ngOnInit() {
    /* Initiate the form structure */
    this.routeForm = this.fb.group({
      title: [],
      station: this.fb.array([this.fb.group({point:''})])
    })
  }

  get allStations(){
    return this.routeForm.get('station') as FormArray;
  }

  addStations() {
    this.allStations.push(this.fb.group({point:''}));
  }

  deleteStations(index) {
    this.allStations.removeAt(index);
  }
  
  showTab = 0;
  tabToggle(index){
    this.showTab = index;
  }
  
}
