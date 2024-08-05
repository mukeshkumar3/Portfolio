import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  public apiUrl = environment.ApiUrl;

  constructor(
    private http: HttpClient
    ) { }

  post(serviceName: string, data: any): Observable <any> {
    // later use
    // const httpOptions = {
    //   headers : new HttpHeaders ({
    //   })
    // } 
    return this.http.post(this.apiUrl + serviceName, data); // httpOptions
  }

  get(serviceName:string):Observable <any> {
    return this.http.get(this.apiUrl + serviceName);
  }

}
