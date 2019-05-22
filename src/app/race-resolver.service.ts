import { Injectable } from '@angular/core';
import { RaceModel } from './models/race.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RaceService } from './race.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceResolverService implements Resolve<RaceModel> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RaceModel> {
    return this.raceService.get(+route.paramMap.get('raceId'));
  }
}
