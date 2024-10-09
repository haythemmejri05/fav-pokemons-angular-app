import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Save user in localStorage
  setUser(userEmail: string): void {
    localStorage.setItem('user', JSON.stringify({ email: userEmail }));
  }

  // Get user from localStorage
  getUser(): User | undefined {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const user = this.getUser();
    // You could add token validation logic here if needed
    return !!user; // True if token exists, false otherwise
  }

  // Log the user out
  logout(): void {
    localStorage.removeItem('user');
  }
}
