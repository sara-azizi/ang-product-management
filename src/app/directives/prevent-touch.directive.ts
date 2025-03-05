import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[preventTouch]',
  standalone: false
})
export class PreventTouchDirective {
  constructor(private control: NgControl) {}
  
  @HostListener('input', ['$event'])
  @HostListener('focus', ['$event'])
  @HostListener('blur', ['$event'])
  
  preventTouch(event: Event) {
    if (this.control.control) {
      this.control.control.markAsUntouched({ onlySelf: true });
    }
  }
}