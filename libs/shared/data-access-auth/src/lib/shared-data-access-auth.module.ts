import {
  APP_INITIALIZER,
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';

import { take } from 'rxjs';

import { AUTH_OPTIONS_TOKEN, AuthOptions, AuthService } from './infrastructure';

@NgModule()
export class SharedDataAccessAuthModule {
  constructor(
    @Optional() @SkipSelf() parentModule?: SharedDataAccessAuthModule
  ) {
    if (parentModule) {
      throw new Error(
        'SharedDataAccessAuthModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(
    options: AuthOptions
  ): ModuleWithProviders<SharedDataAccessAuthModule> {
    return {
      ngModule: SharedDataAccessAuthModule,
      providers: [
        {
          provide: AUTH_OPTIONS_TOKEN,
          useValue: options,
        },
        {
          provide: APP_INITIALIZER,
          useFactory: (authService: AuthService) => () =>
            authService.user$.pipe(take(2)),
          deps: [AuthService],
          multi: true,
        },
      ],
    };
  }
}
