import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RecipesUiFormModule } from '@my-recipes-book/recipes/ui-form';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EditComponent },
    ]),
    RecipesUiFormModule,
  ],
  declarations: [EditComponent],
})
export class RecipesFeatureEditModule {}
