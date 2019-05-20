import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Input() isRunning: boolean;
  @Output() readonly ponyClicked: EventEmitter<PonyModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    let url = 'assets/images/';
    switch (this.ponyModel.color) {
      case 'BLUE':
        url = url + 'pony-blue';
        break;
      case 'GREEN':
        url = url + 'pony-green';
        break;
      case 'ORANGE':
        url = url + 'pony-orange';
        break;
      case 'PURPLE':
        url = url + 'pony-purple';
        break;
      case 'YELLOW':
        url = url + 'pony-yellow';
        break;
    }

    if (this.isRunning) {
      url = url + '-running';
    }
    return url + '.gif';
  }

  clicked(pony: PonyModel): void {
    this.ponyClicked.emit(pony);
  }
}
