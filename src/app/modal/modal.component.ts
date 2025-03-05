import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, TouchedChangeEvent, Validators } from '@angular/forms';
import { Product } from '../product-list/product-list.component'; 


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
  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required ]],
      code: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(1)]]
    });
    
  }


  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  onSubmit() { 

    this.productForm.markAllAsTouched(); 

    if (this.productForm.valid) {
      const productData: Product = {
        id: this.product?.id || 0,
        ...this.productForm.value,
        
      };
      
      this.save.emit(productData);
      this.closeModal();
    }
  }

  closeModal() {
    this.close.emit();
    this.productForm.reset();
  }

  ngOnDestroy() {
    console.log('مدال دیستروی شد');
  }
}

