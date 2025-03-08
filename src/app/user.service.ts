// import { User } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getLastUserId(): Observable<number> {
    return this.http.get<User[]>(this.apiUrl).pipe(
        map(users => {
            if (users && users.length > 0) {
                return users[users.length - 1].id;
            }
            throw new Error('No users found');
        })
    );
  }
}