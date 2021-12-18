import { InjectionToken } from '@angular/core';
import { FirebaseApp } from 'firebase/app';

export const FIREBASE_APP_TOKEN = new InjectionToken<FirebaseApp>(
  'firebase-app'
);
