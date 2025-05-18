import { Injectable } from '@angular/core';
import { User } from '../models/users.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private user: User | null = JSON.parse(
    localStorage.getItem('user') || 'null',
  );

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  logout() {
    localStorage.removeItem('user');
    this.setUser(null);
  }

  constructor() {}
}
