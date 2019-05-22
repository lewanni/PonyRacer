import { Component, OnInit } from '@angular/core';
import { RaceModel } from './../../models/race.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pr-finished-races',
  templateUrl: './finished-races.component.html',
  styleUrls: ['./finished-races.component.css']
})
export class FinishedRacesComponent implements OnInit {

  races: Array<RaceModel>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.races = this.activatedRoute.snapshot.data.races;
  }

}
