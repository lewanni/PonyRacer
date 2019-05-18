import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private httpClient: HttpClient) { }

  list(): Observable<Array<RaceModel>> {
    return this.httpClient.get<Array<RaceModel>>(environment.baseUrl + '/api/races?status=PENDING');
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.httpClient.post<RaceModel>(environment.baseUrl + '/api/races/' + raceId + '/bets', { ponyId });
  }

  get(raceId: number): Observable<RaceModel> {
    return this.httpClient.get<RaceModel>(environment.baseUrl + '/api/races/' + raceId);
  }
}
