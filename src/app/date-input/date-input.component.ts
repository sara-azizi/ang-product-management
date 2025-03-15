import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { invalid } from 'jalali-moment';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  standalone: false
})

export class DateInputComponent {
  @Output() formSubmitted = new EventEmitter<string>();

  dateForm: FormGroup;
  textError: string = '';

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      persianDate: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/),
        this.persianDateValidator()
      ]]
    }, { updateOn: 'change' });

    this.dateForm.get('persianDate')?.valueChanges.subscribe(() => {
      this.textError = this.getTextError();
    });
  }

  persianDateValidator(): ValidatorFn {
    return (control: any) => {
      if (!control.value) return { required: 'تاریخ الزامی است' };

      const parts = control.value.split('/');
      if (parts.length !== 3) return { invalidFormat: 'فرمت تاریخ باید به صورت yyyy/mm/dd باشد' };

      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      if (year < 1300 || year > 1500) return { invalidYear: 'سال باید بین 1300 و 1500 باشد' };
      if (month < 1 || month > 12) return { invalidMonth: 'ماه نامعتبر است' };
      const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : 29;
      if (day < 1 || day > daysInMonth) return { invalidDay: `روز باید بین ۱ تا ${daysInMonth} باشد` };

      return null;
    };
  }

  public submitDate() {
    this.onSubmit();
  }

  onSubmit() {
    this.textError = this.getTextError();
    if (this.dateForm.valid) {
      this.formSubmitted.emit(this.dateForm.value.persianDate);
      console.log('تاریخ درست است:', this.dateForm.value.persianDate);
    } else {
      console.log('تاریخ اشتباه است');
      this.dateForm.markAllAsTouched();
    }
  }

  public getTextError(): string {
    const errors = this.dateForm.get('persianDate')?.errors;
    if (!errors) return '';
    return (
      errors['required'] ||
      errors['invalidFormat'] ||
      errors['invalidYear'] ||
      errors['invalidMonth'] ||
      errors['invalidDay'] ||
      ''
    );
  }
}