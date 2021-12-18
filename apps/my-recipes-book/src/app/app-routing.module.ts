import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthGuard,
  NoAuthGuard,
} from '@my-recipes-book/shared/data-access-auth';

const roots: Routes = [
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
    path: 'recipes',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('@my-recipes-book/recipes/feature-list').then(
            ({ RecipesFeatureListModule }) => RecipesFeatureListModule
          ),
      },
      {
        path: 'new',
        loadChildren: () =>
          import('@my-recipes-book/recipes/feature-new').then(
            ({ RecipesFeatureNewModule }) => RecipesFeatureNewModule
          ),
      },
      {
        path: ':id',
        pathMatch: 'full',
        loadChildren: () =>
          import('@my-recipes-book/recipes/feature-detail').then(
            ({ RecipesFeatureDetailModule }) => RecipesFeatureDetailModule
          ),
      },
      {
        path: ':id/edit',
        loadChildren: () =>
          import('@my-recipes-book/recipes/feature-edit').then(
            ({ RecipesFeatureEditModule }) => RecipesFeatureEditModule
          ),
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'recipes',
  },
  {
    path: '**',
    loadChildren: () =>
      import('@my-recipes-book/shared/feature-not-found').then(
        ({ SharedFeatureNotFoundModule }) => SharedFeatureNotFoundModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(roots)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
