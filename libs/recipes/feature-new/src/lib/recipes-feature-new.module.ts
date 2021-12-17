import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NewComponent } from './new.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NewComponent },
    ]),
  ],
  declarations: [NewComponent],
})
export class RecipesFeatureNewModule {}
