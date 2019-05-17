import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  host: string;

  constructor(private httpClient: HttpClient) {
    this.host = 'http://ponyracer.ninja-squad.com/';
  }

  list(): Observable<Array<RaceModel>> {

    return this.httpClient.get<Array<RaceModel>>(environment.baseUrl + '/api/races?status=PENDING');
  }
}
