import { Injectable } from '@angular/core';
import { RaceModel, LiveRaceModel } from './models/race.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { PonyWithPositionModel } from './models/pony.model';
import { map, takeWhile } from 'rxjs/operators';
import { WsService } from './ws.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private httpClient: HttpClient, private wsService: WsService) { }

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
    return this.wsService.connect<LiveRaceModel>(`/race/${raceId}`).pipe(
      takeWhile(liveRace => liveRace.status !== 'FINISHED'),
      map(liveRace => liveRace.ponies)
    );
  }
}
