import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { User, UserCredentials/*, UserSignUpCredentials*/ } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    this.user = new BehaviorSubject<User | null>(null);
  }

  getUser(): Observable<User | null> {
    return this.user;
  }

  signIn(credentials: UserCredentials): Observable<User> {
    return this.http
      .post<User>('/api/sign-in', credentials)
      .pipe(map((user: User) => {
        this.user.next(user);
        return user;
      }));
  }

  signUp(credentials: UserCredentials): Observable<User> {
    return this.http
      .post<User>('/api/sign-up', credentials)
      .pipe(map((user: User) => {
        this.user.next(user);
        return user;
      }));
  }

  signOut() {
    this.user.next(null);
  }
}
