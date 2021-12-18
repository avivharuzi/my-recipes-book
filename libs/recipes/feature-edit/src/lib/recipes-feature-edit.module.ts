import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesFeatureFormModule } from '@my-recipes-book/recipes/feature-form';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EditComponent },
    ]),
    RecipesFeatureFormModule,
  ],
  declarations: [EditComponent],
})
export class RecipesFeatureEditModule {}
