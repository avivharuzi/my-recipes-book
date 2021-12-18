import { InjectionToken } from '@angular/core';

import { AuthOptions } from './auth-options';

export const AUTH_OPTIONS_TOKEN = new InjectionToken<AuthOptions>(
  'auth-options'
);
