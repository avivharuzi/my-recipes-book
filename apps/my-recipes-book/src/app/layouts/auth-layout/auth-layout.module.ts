import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MyRecipesBookFeatureFooterModule } from '@my-recipes-book/my-recipes-book/feature-footer';
import { MyRecipesBookFeatureHeaderModule } from '@my-recipes-book/my-recipes-book/feature-header';

import { AuthLayoutRoutingModule } from './auth-layout.routing.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    AuthLayoutRoutingModule,
    MyRecipesBookFeatureFooterModule,
    MyRecipesBookFeatureHeaderModule,
  ],
})
export class AuthLayoutModule {}
