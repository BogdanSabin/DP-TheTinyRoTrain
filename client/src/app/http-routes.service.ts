import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpRoutesService {

  constructor(private http: HttpClient, private _router: Router) { }
  private _createRouteURL = "http://localhost:11010/api/resource/route/create";
  public postRoute(route){
    return this.http.post<any>(this._createRouteURL,route);
  }

}
