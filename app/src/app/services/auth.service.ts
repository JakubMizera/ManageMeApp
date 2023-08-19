import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor() {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    this.currentUserSubject.next(user);
  };

  login(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  };

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  };
}
