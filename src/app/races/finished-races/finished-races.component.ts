import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RaceModel } from './../../models/race.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinishedRacesComponent implements OnInit {

  races: Array<RaceModel>;

  page: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.page = 1;
  }

  ngOnInit() {
    this.races = this.activatedRoute.snapshot.data.races;
  }

}
