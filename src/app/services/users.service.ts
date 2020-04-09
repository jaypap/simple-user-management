import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /* properties */
  protected httpClient: HttpClient;

  constructor(
    /* inject HttpClient service - performs requests */
    httpClient: HttpClient
  ) {

    this.httpClient = httpClient;
  }
  /*Create our get service using get method from httpClient service
  * @param url - the url call  http://jsonplaceholder.typicode.com/users
  * @param params -the parameters we pass to our call-
  * User object with properties such as name, username, email etc (input)
  * @param options - property of get method, object with two parameters - headers:HttpHeaders and  SearchParameters object
  * return get method with 500 ms delay
  */
  public get(url: string): Observable<any> {
    // const options: { headers?: HttpHeaders, params?: any } = {
    //   headers: new HttpHeaders()
    // };
    // options.params = Object.assign(params);
    return this.httpClient.get(url).pipe(delay(500));
  }


}
