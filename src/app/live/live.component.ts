import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';
import { tap, filter, switchMap } from 'rxjs/operators';

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

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) {
    this.error = false;
    this.poniesWithPosition = [];
  }

  ngOnInit() {
    this.raceModel = null;
    const id = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.positionSubscription = this.raceService.get(parseInt(id, 10)).pipe(
      tap(race => this.raceModel = race),
      filter(race => race.status !== 'FINISHED'),
      switchMap(race => this.raceService.live(race.id))
    ).subscribe(
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

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
