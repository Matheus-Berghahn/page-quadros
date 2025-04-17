import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasUser());
  private userNameSubject = new BehaviorSubject<string | null>(this.getUserName());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  userName$ = this.userNameSubject.asObservable();

  constructor() {}

  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedInSubject.next(true);
    this.userNameSubject.next(user.name);
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
    this.userNameSubject.next(null);
  }

  private hasUser(): boolean {
    return !!localStorage.getItem('user');
  }

  private getUserName(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).name : null;
  }
}
