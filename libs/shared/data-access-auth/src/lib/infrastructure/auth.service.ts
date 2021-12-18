import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  FirebaseAuthService,
  FirebaseFirestoreService,
  FirebaseUser,
} from '@my-recipes-book/shared/util-firebase';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { User } from '../entities';
import { AuthOptions } from './auth-options';
import { AUTH_OPTIONS_TOKEN } from './auth-options-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly USERS_COLLECTION_NAME = 'users';

  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    @Inject(AUTH_OPTIONS_TOKEN) private readonly authOptions: AuthOptions,
    private firebaseFirestoreService: FirebaseFirestoreService,
    private firebaseAuthService: FirebaseAuthService,
    private readonly router: Router
  ) {
    this.listenToOnAuthStateChanged();
  }

  get user$(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  get isLoggedIn$(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  get isLoggedOut$(): Observable<boolean> {
    return this.isLoggedIn$.pipe(map((isLoggedIn) => !isLoggedIn));
  }

  signInWithGoogle(): Observable<boolean> {
    return this.firebaseAuthService.signInWithGoogle().pipe(
      switchMap((user) => this.updateUserAfterSignIn(user)),
      switchMap(() => this.redirectToLoggedInRoute())
    );
  }

  signOut(): Observable<boolean> {
    return this.firebaseAuthService
      .signOut()
      .pipe(switchMap(() => this.redirectToLoggedOutRoute()));
  }

  redirectToLoggedInRoute(): Observable<boolean> {
    return from(this.router.navigate([this.authOptions.loggedInRedirectTo]));
  }

  redirectToLoggedOutRoute(): Observable<boolean> {
    return from(this.router.navigate([this.authOptions.loggedOutRedirectTo]));
  }

  private listenToOnAuthStateChanged(): void {
    this.firebaseAuthService
      .onAuthStateChanged()
      .pipe(
        switchMap((user) => {
          if (!user) {
            return of(null);
          }

          return this.firebaseFirestoreService.getOne<User>([
            this.USERS_COLLECTION_NAME,
            user.uid,
          ]);
        }),
        tap((user) => this.userSubject.next(user))
      )
      .subscribe();
  }

  private updateUserAfterSignIn(user: FirebaseUser): Observable<void> {
    const userData = {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };

    return this.firebaseFirestoreService.setOne<User>(
      [this.USERS_COLLECTION_NAME, user.uid],
      userData,
      {
        merge: true,
      }
    );
  }
}
