import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedUiCardModule } from '@my-recipes-book/shared/ui/card';
import { SharedUiAddCardModule } from '@my-recipes-book/shared/ui/add-card';

import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListComponent },
    ]),
    SharedUiCardModule,
    SharedUiAddCardModule,
  ],
  declarations: [ListComponent],
})
export class RecipesFeatureListModule {}
