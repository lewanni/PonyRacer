import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Observable, interval } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map, take } from 'rxjs/operators';

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

  cancelBet(raceId: number): Observable<any> {
    return this.httpClient.delete<any>(environment.baseUrl + '/api/races/' + raceId + '/bets');
  }

  live(raceId: number): Observable<Array<PonyWithPositionModel>> {
    const positions = interval(1000);
    return positions.pipe(take(101), map(n => {
      return [{
        id: 1,
        name: 'Superb Runner',
        color: 'BLUE',
        position: n
      }, {
        id: 2,
        name: 'Awesome Fridge',
        color: 'GREEN',
        position: n
      }, {
        id: 3,
        name: 'Great Bottle',
        color: 'ORANGE',
        position: n
      }, {
        id: 4,
        name: 'Little Flower',
        color: 'YELLOW',
        position: n
      }, {
        id: 5,
        name: 'Nice Rock',
        color: 'PURPLE',
        position: n
      }];
    }));
  }
}
