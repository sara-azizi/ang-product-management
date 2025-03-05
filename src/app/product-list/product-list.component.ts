import { Component } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  code: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  standalone: false
})
export class ProductListComponent {
  
  products: Product[] = [];
  showModal = false;
  selectedProduct: Product | null = null;

  constructor() {
    this.products = [
      { id: 1, name: 'محصول تست', code: '1', price: 1500 },
      { id: 2, name: '2محصول تست', code: '2', price: 2000 },
      { id: 3, name: '3محصول تست', code: '3', price: 3000 },
    ];
  }

  openModal() {
    this.showModal = true;
    this.selectedProduct = null;
  }

  openEditModal(product: Product) {
    this.selectedProduct = { ...product };
    this.showModal = true;
  }

  saveProduct(product: Product) {
    if (product.id) {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
      }
    } else {
      product.id = this.products.length + 1;
      this.products.push(product);
    }
    this.closeModal();
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
  }

  closeModal() {
    this.showModal = false;
  }
}