import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string;

  constructor(private httpClient: HttpClient) {
    this.host = 'http://ponyracer.ninja-squad.com/';
  }

  register(login: string, password: string, birthYear: number): Observable<object> {
    const user = { login, password, birthYear };
    return this.httpClient.post<object>(this.host + 'api/users', user);
  }

  authenticate(credentials: object): Observable<object> {
    console.log(credentials);
    return this.httpClient.post<object>(this.host + 'api/users/authentication', credentials);
  }
}
