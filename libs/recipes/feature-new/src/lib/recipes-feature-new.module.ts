import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesUiFormModule } from '@my-recipes-book/recipes/ui-form';
import { NewComponent } from './new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NewComponent },
    ]),
    RecipesUiFormModule,
  ],
  declarations: [NewComponent],
})
export class RecipesFeatureNewModule {}
