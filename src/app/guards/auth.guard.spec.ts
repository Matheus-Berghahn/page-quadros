import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when logged in', () => {
    localStorage.setItem('loggedIn', 'true');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should block activation when not logged in', () => {
    localStorage.removeItem('loggedIn');
    expect(guard.canActivate()).toBeFalse();
  });
});
