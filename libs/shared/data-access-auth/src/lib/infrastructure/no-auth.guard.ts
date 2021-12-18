import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { first, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedOut$.pipe(
      first(),
      tap((isLoggedOut) => {
        if (!isLoggedOut) {
          this.authService.redirectToLoggedInRoute();
        }
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
