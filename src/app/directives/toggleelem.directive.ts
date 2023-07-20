import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appToggleElem]'
})
export class ToggleElemDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event']) openDetails(event: any) {
    const target = this.elementRef.nativeElement;
    target.classList.toggle('isOpen');
  }
}
