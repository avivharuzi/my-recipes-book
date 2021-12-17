import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NotFoundComponent },
    ]),
  ],
  declarations: [NotFoundComponent],
})
export class SharedFeatureNotFoundModule {}
