import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RaceModel } from './models/race.model';
import { RaceService } from './race.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacesResolverService implements Resolve<Array<RaceModel>> {

  constructor(private raceService: RaceService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<RaceModel>> {
    return this.raceService.list(route.routeConfig.path.toUpperCase());
  }
}
