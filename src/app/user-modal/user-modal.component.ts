import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { luser } from '../user-list/user-list.component';
import { User } from '../user.service';

@Component({
  selector: 'app-user-modal',
  standalone: false,
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css'
})
export class UserModalComponent  implements OnInit {
  @Input() luser: luser | null = null;
  @Output() save = new EventEmitter<luser>();
  @Output() close = new EventEmitter<void>();
  UserForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.UserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]] 
    });
    
  }


  ngOnInit() {
    if (this.luser) {
      this.UserForm.patchValue(this.luser);
    }
  }

  onSubmit() { 

    this.UserForm.markAllAsTouched(); 

    if (this.UserForm.valid) {
      const userData: luser = {
        id: this.luser?.id || 0,
        ...this.UserForm.value,
        
      };
      
      this.save.emit(userData);
      this.closeUserModal();
    }
  }

  closeUserModal() {
    this.close.emit();
    this.UserForm.reset();
  }

  ngOnDestroy() {
    console.log('مدال دیستروی شد');
  }
}

