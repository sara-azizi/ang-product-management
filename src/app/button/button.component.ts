import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: '<button (click)="onClick.emit()">اضافه کردن محصول</button>',
  styles: `
*{
    font-family: 'Vazir', sans-serif;
  }

button{

    background-color: #4CAF50; 
    color: white; 
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer; 
    font-size: 14px; 
    transition: background-color 0.3s; 
    height: 40px;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
button:hover { 
      background-color:rgb(43, 104, 46); 
    }

  `,
  standalone: false
})
export class ButtonComponent {
  @Output() onClick = new EventEmitter<void>();
}