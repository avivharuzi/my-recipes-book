import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { FirebaseApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import { FIREBASE_APP_TOKEN } from '../firebase-app';
import { FIREBASE_STORAGE_TOKEN } from './firebase-storage-token';

@NgModule()
export class FirebaseStorageModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseStorageModule) {
    if (parentModule) {
      throw new Error(
        'FirebaseStorageModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders<FirebaseStorageModule> {
    return {
      ngModule: FirebaseStorageModule,
      providers: [
        {
          provide: FIREBASE_STORAGE_TOKEN,
          useFactory: (app: FirebaseApp) => getStorage(app),
          deps: [FIREBASE_APP_TOKEN],
        },
      ],
    };
  }
}
