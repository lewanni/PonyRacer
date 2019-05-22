import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'pr-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Output() readonly close = new EventEmitter<void>();
  @Input() type = 'warning';
  @Input() dismissible = true;

  constructor() { }

  ngOnInit() {
  }

  closeHandler(): void {
    this.close.emit();
  }

  get alertClasses() {
    return `alert alert-${this.type}`;
  }
}
