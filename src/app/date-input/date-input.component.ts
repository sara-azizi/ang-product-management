import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import jalaliMoment from 'jalali-moment';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  standalone: false
})
export class DateInputComponent implements OnInit {
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

      // بررسی سال
      if (year < 1300 || year > 1500) {
        return { invalidYear: true };
      }

      // بررسی ماه
      if (month < 1 || month > 12) {
        return { invalidMonth: true };
      }

      const daysInMonth = month <= 6 ? 31 : month <= 11 ? 30 : 29;

      if (day < 1 || day > daysInMonth) {
        return { invalidDay: true };
      }

      return null; 
    };
  }

  onSubmit() {
    if (this.dateForm.valid) {
      console.log('Date is valid:', this.dateForm.value.persianDate);
    } else {
      console.log('Date is invalid');
      this.dateForm.markAllAsTouched(); 
    }
  }
}