import { Component, OnInit } from '@angular/core';
import { RaceModel } from './../../models/race.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-pending-races',
  templateUrl: './pending-races.component.html',
  styleUrls: ['./pending-races.component.css']
})
export class PendingRacesComponent implements OnInit {

  races: Array<RaceModel>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.races = this.activatedRoute.snapshot.data.races;
  }

}
