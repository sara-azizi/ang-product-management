import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';
import { Observable } from 'rxjs';

export interface luser {
  id: number;
  name: string;
  email: string;
  phone: number;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: false,
})

export class UserListComponent implements OnInit {

  showUserModal = false;
  lastUserId: number | null = null;
  newUsers: luser[] = []
  users$: Observable<User[]> = new Observable<User[]>();

  constructor(private userService: UserService) { 
  }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();

    this.userService.getLastUserId().subscribe({
      next: (id) => {
          this.lastUserId = id; 
      }
  });

  }

  openUserModal() {
    this.showUserModal = true;
  }
  
  saveUser( luser: luser ){
    luser.id = this.lastUserId! + 1 ;
    console.log(luser.id)
    this.newUsers.push(luser);
  }
 
  
  closeUserModal() {
      this.showUserModal = false;
  }
}

