import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FirebaseOptions, initializeApp } from 'firebase/app';

import { FIREBASE_APP_TOKEN } from './firebase-app-token';

@NgModule()
export class FirebaseAppModule {
  constructor(@Optional() @SkipSelf() parentModule?: FirebaseAppModule) {
    if (parentModule) {
      throw new Error(
        'FirebaseAppModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    options: FirebaseOptions
  ): ModuleWithProviders<FirebaseAppModule> {
    return {
      ngModule: FirebaseAppModule,
      providers: [
        {
          provide: FIREBASE_APP_TOKEN,
          useFactory: () => initializeApp(options),
        },
      ],
    };
  }
}
