import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: false,
})

export class UserListComponent implements OnInit {
  users$: Observable<User[]> = new Observable<User[]>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
  }
}