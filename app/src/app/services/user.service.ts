import { Injectable } from '@angular/core';
import { User } from '../types';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];

  constructor() {
    this.loadUsersFromStorage();
  };

  createUser(user: User): void {
    this.users.push(user);
    this.saveUsersToStorage();
  };

  getUser(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  };

  updateUser(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.saveUsersToStorage();
    };
  };

  deleteUser(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveUsersToStorage();
    };
  };

  private loadUsersFromStorage(): void {
    const usersData = localStorage.getItem('users');
    if (usersData) {
      this.users = JSON.parse(usersData);
    };
  };

  private saveUsersToStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  };
};
