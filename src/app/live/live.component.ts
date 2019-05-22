import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription, Subject, interval, EMPTY } from 'rxjs';
import { filter, switchMap, groupBy, mergeMap, bufferToggle, throttleTime, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;
  error: boolean;
  betWon: boolean;
  winners: Array<PonyWithPositionModel>;
  clickSubject: Subject<PonyWithPositionModel>;

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) {
    this.error = false;
    this.poniesWithPosition = [];
    this.winners = [];
    this.clickSubject = new Subject<PonyWithPositionModel>();
  }

  ngOnInit() {
    this.raceModel = this.activatedRoute.snapshot.data.race;

    if (this.raceModel.status !== 'FINISHED') {
      this.positionSubscription = this.raceService.live(this.raceModel.id).subscribe(
        race => {
          this.poniesWithPosition = race;
          this.raceModel.status = 'RUNNING';
        },
        error => {
          this.error = true;
        },
        () => {
          this.raceModel.status = 'FINISHED';
          this.winners = this.poniesWithPosition.filter(pony => pony.position >= 100);
          this.betWon = this.winners.some(pony => pony.id === this.raceModel.betPonyId);
        });
    }

    this.clickSubject.pipe(
      groupBy(pony => pony.id, pony => pony.id),
      mergeMap(obs => obs.pipe(bufferToggle(obs, () => interval(1000)))),
      filter(click => click.length >= 5),
      throttleTime(1000),
      map(click => click[0]),
      switchMap(ponyId => this.raceService.boost(this.raceModel.id, ponyId).pipe(
        catchError(() => EMPTY)
      ))
    ).subscribe(() => { });
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }

  onClick(pony: PonyWithPositionModel): void {
    this.clickSubject.next(pony);
  }

  ponyById(index: number, pony: PonyWithPositionModel): number {
    return pony.id;
  }
}
