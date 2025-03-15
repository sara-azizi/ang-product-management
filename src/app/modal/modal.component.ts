import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product-list/product-list.component';
import { DateInputComponent } from '../date-input/date-input.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: false
})
export class ModalComponent implements OnInit {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Product>();
  @Output() close = new EventEmitter<void>();
  @ViewChild(DateInputComponent) dateInputComponent!: DateInputComponent;

  productForm: FormGroup;
  submittedDate: string | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
      date: ['']
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSubmit() {
    // تاریخ رو از DateInputComponent می‌خوایم
    this.dateInputComponent.submitDate();

    // چک می‌کنیم که فرم مودال و تاریخ هر دو درست باشن
    if (this.productForm.valid && this.submittedDate) {
      const productData: Product = {
        id: this.product?.id || 0,
        ...this.productForm.value,
        date: this.submittedDate 
      };
      this.save.emit(productData);
      this.closeModal();
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.close.emit();
    this.productForm.reset();
    this.submittedDate = null;
  }

  ngOnDestroy() {
    console.log('مودال بسته شد');
  }

  // تاریخ رو از DateInputComponent می‌گیریم
  onFormSubmitted(date: string) {
    this.submittedDate = date;
    console.log('تاریخ دریافت شد:', date);
  }
}