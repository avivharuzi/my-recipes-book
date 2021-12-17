import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: EditComponent },
    ]),
  ],
  declarations: [EditComponent],
})
export class RecipesFeatureEditModule {}
