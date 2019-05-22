/* tslint:disable:directive-selector */

import { Directive, ContentChild, AfterContentInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormLabelDirective } from './form-label.directive';

@Directive({
  selector: '.form-group'
})
export class FormLabelValidationDirective implements AfterContentInit {

  @ContentChild(NgControl) ngControl: NgControl;
  @ContentChild(FormLabelDirective) label: FormLabelDirective;


  constructor() { }

  ngAfterContentInit() {
    if (this.ngControl && this.label) {
      this.setLabelValidity();
      this.ngControl.statusChanges.subscribe(() => this.setLabelValidity());
    }
  }

  setLabelValidity() {
    if (this.ngControl.dirty && this.ngControl.invalid) {
      this.label.isInvalid = true;
    } else {
      this.label.isInvalid = false;
    }
  }
}
