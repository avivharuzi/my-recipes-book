import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { first, Observable, tap } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      first(),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.authService.redirectToLoggedOutRoute();
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
