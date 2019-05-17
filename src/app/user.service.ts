import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string;
  userEvents: BehaviorSubject<UserModel>;

  constructor(private httpClient: HttpClient) {
    this.host = 'http://ponyracer.ninja-squad.com/';
    this.userEvents = new BehaviorSubject<UserModel>(undefined);
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<object> {
    const user = { login, password, birthYear };
    return this.httpClient.post<object>(this.host + 'api/users', user);
  }

  authenticate(credentials: object): Observable<UserModel> {
    return this.httpClient.post<UserModel>(this.host + 'api/users/authentication', credentials)
      .pipe(tap(user => {
        this.storeLoggedInUser(user);
      }));
  }

  storeLoggedInUser(user: UserModel): void {
    if (!localStorage.getItem('rememberMe')) {
      localStorage.setItem('rememberMe', JSON.stringify(user));
      this.userEvents.next(user);
    }
  }

  retrieveUser(): void {
    if (localStorage.getItem('rememberMe')) {
      this.userEvents.next(JSON.parse(localStorage.getItem('rememberMe')));
    }
  }
}
