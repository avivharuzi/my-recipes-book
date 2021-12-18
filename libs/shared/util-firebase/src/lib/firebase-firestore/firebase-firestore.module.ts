import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FirebaseApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import { FIREBASE_APP_TOKEN } from '../firebase-app';
import { FIREBASE_FIRESTORE_TOKEN } from './firebase-firestore-token';

@NgModule()
export class FirebaseFirestoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseFirestoreModule) {
    if (parentModule) {
      throw new Error(
        'FirebaseFirestoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<FirebaseFirestoreModule> {
    return {
      ngModule: FirebaseFirestoreModule,
      providers: [
        {
          provide: FIREBASE_FIRESTORE_TOKEN,
          useFactory: (app: FirebaseApp) => getFirestore(app),
          deps: [FIREBASE_APP_TOKEN],
        },
      ],
    };
  }
}
