import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  standalone: false
})
export class DateInputComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<string>();

  dateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      persianDate: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/),
        this.persianDateValidator()
      ]]
    });
  }

  ngOnInit(): void {}

  persianDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const parts = control.value.split('/');
      if (parts.length !== 3) return { invalidFormat: true };

      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      if (year < 1300 || year > 1500) return { invalidYear: true };
      if (month < 1 || month > 12) return { invalidMonth: true };
      const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : 29;
      if (day < 1 || day > daysInMonth) return { invalidDay: true };

      return null;
    };
  }

  // این متد رو عمومی می‌کنیم تا از بیرون بشه صداش زد
  public submitDate() {
    this.onSubmit();
  }

  onSubmit() {
    if (this.dateForm.valid) {
      this.formSubmitted.emit(this.dateForm.value.persianDate);
      console.log('تاریخ درست است:', this.dateForm.value.persianDate);
    } else {
      console.log('تاریخ اشتباه است');
      this.dateForm.markAllAsTouched();
    }
  }
}