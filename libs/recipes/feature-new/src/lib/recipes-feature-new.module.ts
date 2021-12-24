import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesFeatureFormModule } from '@my-recipes-book/recipes/feature-form';

import { NewComponent } from './new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NewComponent },
    ]),
    RecipesFeatureFormModule,
  ],
  declarations: [NewComponent],
})
export class RecipesFeatureNewModule {}
