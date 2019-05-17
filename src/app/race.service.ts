import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  host: string;

  constructor(private httpClient: HttpClient) {
    this.host = 'http://ponyracer.ninja-squad.com/';
  }

  list(): Observable<Array<RaceModel>> {

    return this.httpClient.get<Array<RaceModel>>(this.host + 'api/races?status=PENDING');
  }
}
