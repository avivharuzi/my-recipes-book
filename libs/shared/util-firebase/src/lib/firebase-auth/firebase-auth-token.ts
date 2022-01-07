import { InjectionToken } from '@angular/core';

import { Auth } from 'firebase/auth';

export const FIREBASE_AUTH_TOKEN = new InjectionToken<Auth>('firebase-auth');
