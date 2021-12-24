import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@my-recipes-book/shared/data-access-auth';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@my-recipes-book/my-recipes-book/feature-not-found').then(
            ({ MyRecipesBookFeatureNotFoundModule }) =>
              MyRecipesBookFeatureNotFoundModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthLayoutRoutingModule {}
