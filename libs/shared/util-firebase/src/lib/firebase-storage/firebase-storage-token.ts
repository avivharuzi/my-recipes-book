import { InjectionToken } from '@angular/core';

import { FirebaseStorage } from 'firebase/storage';

export const FIREBASE_STORAGE_TOKEN = new InjectionToken<FirebaseStorage>(
  'firebase-storage'
);
