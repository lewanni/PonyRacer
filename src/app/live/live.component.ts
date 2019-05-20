import { Component, OnInit, OnDestroy } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { RaceService } from '../race.service';
import { ActivatedRoute } from '@angular/router';
import { PonyWithPositionModel } from '../models/pony.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;
  positionSubscription: Subscription;

  constructor(private raceService: RaceService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.raceModel = null;
    const id = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(parseInt(id, 10)).subscribe(race => {
      this.raceModel = race;
    });
    this.positionSubscription = this.raceService.live(parseInt(id, 10)).subscribe(ponies => {
      this.poniesWithPosition = ponies;
    });
  }

  ngOnDestroy() {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
