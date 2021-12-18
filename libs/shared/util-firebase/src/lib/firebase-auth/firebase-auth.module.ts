import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { FIREBASE_APP_TOKEN } from '../firebase-app';
import { FIREBASE_AUTH_TOKEN } from './firebase-auth-token';

@NgModule()
export class FirebaseAuthModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseAuthModule) {
    if (parentModule) {
      throw new Error(
        'FirebaseAuthModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<FirebaseAuthModule> {
    return {
      ngModule: FirebaseAuthModule,
      providers: [
        {
          provide: FIREBASE_AUTH_TOKEN,
          useFactory: (app: FirebaseApp) => getAuth(app),
          deps: [FIREBASE_APP_TOKEN],
        },
      ],
    };
  }
}
