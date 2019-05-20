import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host: string;
  userEvents: BehaviorSubject<UserModel>;

  constructor(private httpClient: HttpClient, private jwtInterceptorService: JwtInterceptorService, private wsService: WsService) {
    this.userEvents = new BehaviorSubject<UserModel>(undefined);
    this.retrieveUser();
  }

  register(login: string, password: string, birthYear: number): Observable<object> {
    const user = { login, password, birthYear };
    return this.httpClient.post<object>(environment.baseUrl + '/api/users', user);
  }

  authenticate(credentials: object): Observable<UserModel> {
    return this.httpClient.post<UserModel>(environment.baseUrl + '/api/users/authentication', credentials)
      .pipe(tap(user => {
        this.storeLoggedInUser(user);
      }));
  }

  storeLoggedInUser(user: UserModel): void {
    if (!localStorage.getItem('rememberMe')) {
      localStorage.setItem('rememberMe', JSON.stringify(user));
      this.userEvents.next(user);
      this.jwtInterceptorService.setJwtToken(user.token);
    }
  }

  retrieveUser(): void {
    if (localStorage.getItem('rememberMe')) {
      this.userEvents.next(JSON.parse(localStorage.getItem('rememberMe')));
      this.jwtInterceptorService.setJwtToken(JSON.parse(localStorage.getItem('rememberMe')).token);
    }
  }

  logout(): void {
    this.userEvents.next(null);
    localStorage.removeItem('rememberMe');
    this.jwtInterceptorService.removeJwtToken();
  }

  scoreUpdates(myUserId: number): Observable<UserModel> {
    return this.wsService.connect<UserModel>(`/player/${myUserId}`);
  }
}
