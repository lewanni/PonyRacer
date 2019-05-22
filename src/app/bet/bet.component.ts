import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  raceModel: RaceModel;
  betFailed: boolean;

  constructor(private activatedRoute: ActivatedRoute, private raceService: RaceService) {
    this.betFailed = false;
  }

  ngOnInit() {
    this.raceModel = this.activatedRoute.snapshot.data.race;
  }

  betOnPony(pony: PonyModel): void {
    if (!this.isPonySelected(pony)) {
      this.raceService.bet(this.raceModel.id, pony.id).subscribe(race => this.raceModel = race,
        () => this.betFailed = true
      );
    } else {
      this.raceService.cancelBet(this.raceModel.id).subscribe(() => this.raceModel.betPonyId = null,
        () => this.betFailed = true);
    }
  }

  isPonySelected(pony: PonyModel): boolean {
    return pony.id === this.raceModel.betPonyId;
  }
}
