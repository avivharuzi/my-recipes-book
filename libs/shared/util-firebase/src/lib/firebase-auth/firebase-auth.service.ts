import { Inject, Injectable } from '@angular/core';
import {
  Auth,
  AuthProvider,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { Observable } from 'rxjs';

import { FIREBASE_AUTH_TOKEN } from './firebase-auth-token';
import { FirebaseAuthEmailPassword } from './firebase-auth-email-password';
import { fromFirebasePromise } from '../utils';
import { fromFirebaseSignInPromise } from './utils';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  constructor(@Inject(FIREBASE_AUTH_TOKEN) private readonly auth: Auth) {}

  createUserWithEmailAndPassword({
    email,
    password,
  }: FirebaseAuthEmailPassword): Observable<User> {
    return fromFirebaseSignInPromise(
      createUserWithEmailAndPassword(this.auth, email, password)
    );
  }

  onAuthStateChanged(): Observable<User | null> {
    return new Observable((subscriber) => {
      const unsubscribe = onAuthStateChanged(
        this.auth,
        (auth) => {
          subscriber.next(auth);
        },
        (error) => {
          subscriber.error(error);
        },
        () => {
          subscriber.complete();
        }
      );

      return {
        unsubscribe,
      };
    });
  }

  signInWithEmailAndPassword({
    email,
    password,
  }: FirebaseAuthEmailPassword): Observable<User> {
    return fromFirebaseSignInPromise(
      signInWithEmailAndPassword(this.auth, email, password)
    );
  }

  signInWithGoogle(): Observable<User> {
    return this.signInWithPopup(new GoogleAuthProvider());
  }

  signOut(): Observable<void> {
    return fromFirebasePromise(signOut(this.auth));
  }

  private signInWithPopup(provider: AuthProvider): Observable<User> {
    return fromFirebaseSignInPromise(signInWithPopup(this.auth, provider));
  }
}
