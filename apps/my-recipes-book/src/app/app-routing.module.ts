import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  NoAuthGuard,
} from '@my-recipes-book/shared/data-access-auth';

const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [NoAuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@my-recipes-book/auth/feature-login').then(
            ({ AuthFeatureLoginModule }) => AuthFeatureLoginModule
          ),
      },
    ],
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./layouts/auth-layout/auth-layout.module').then(
        ({ AuthLayoutModule }) => AuthLayoutModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      paramsInheritanceStrategy: 'always',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
