import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[persianDateFormat]',
  standalone: false
})
export class PersianDateFormatDirective {
  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    let value = this.el.nativeElement.value.replace(/[^0-9]/g, ''); // فقط اعداد رو نگه می‌داریم

    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    let formattedValue = '';
    if (value.length > 0) {
      formattedValue += value.slice(0, 4); // سال (4 رقم)
      if (value.length >= 5) {
        formattedValue += '/' + value.slice(4, 6); // ماه (2 رقم)
      }
      if (value.length >= 7) {
        formattedValue += '/' + value.slice(6, 8); // روز (2 رقم)
      }
    }

    // به‌روزرسانی مقدار input
    this.el.nativeElement.value = formattedValue;

    // به‌روزرسانی مقدار در کنترل فرم
    if (this.control.control) {
      this.control.control.setValue(formattedValue, { emitEvent: false });
    }
  }
}