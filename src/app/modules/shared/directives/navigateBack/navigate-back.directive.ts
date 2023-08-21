import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[NavigateBack]'
})
export class NavigateBackDirective {

  constructor(private location: Location) {}

  @HostListener('click')
  goBack() {
    this.location.back();
  }

}
