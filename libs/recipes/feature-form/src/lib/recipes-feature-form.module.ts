import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedUiDefaultImageModule } from '@my-recipes-book/shared/ui/default-image';
import { SharedUiFormInputModule } from '@my-recipes-book/shared/ui/form-input';
import { SharedUiFormInputFileModule } from '@my-recipes-book/shared/ui/form-input-file';
import { SharedUiFormTextareaModule } from '@my-recipes-book/shared/ui/form-textarea';

import { SharedUiSafeUrlModule } from '@my-recipes-book/shared/ui/safe-url';

import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiSafeUrlModule,
    RouterModule,
    SharedUiFormInputFileModule,
    SharedUiFormInputModule,
    SharedUiFormTextareaModule,
    SharedUiDefaultImageModule,
  ],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class RecipesFeatureFormModule {}
