import { InjectionToken } from '@angular/core';
import { Firestore } from 'firebase/firestore';

export const FIREBASE_FIRESTORE_TOKEN = new InjectionToken<Firestore>(
  'firebase-firestore'
);
