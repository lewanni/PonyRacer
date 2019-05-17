import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input() ponyModel: PonyModel;
  @Output() readonly ponyClicked: EventEmitter<PonyModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    let url = 'assets/images/';
    switch (this.ponyModel.color) {
      case 'BLUE':
        url = url + 'pony-blue.gif';
        break;
      case 'GREEN':
        url = url + 'pony-green.gif';
        break;
      case 'ORANGE':
        url = url + 'pony-orange.gif';
        break;
      case 'PURPLE':
        url = url + 'pony-purple.gif';
        break;
      case 'YELLOW':
        url = url + 'pony-yellow.gif';
        break;
    }
    return url;
  }

  clicked(pony: PonyModel): void {
    this.ponyClicked.emit(pony);
  }
}
