import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1600";


  constructor(private http:HttpClient) { 

  }

  public getInfo() : Observable<any>{
    return this.http.get<any>(this.apiURL);
  }

  public getStats(url: string) : Observable<any>{
    return this.http.get<any>(url);
  }
}