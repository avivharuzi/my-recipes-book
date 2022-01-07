import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUiFormInputErrorMessageModule } from '@my-recipes-book/shared/ui/form-input-error-message';

import { FormTextareaComponent } from './form-textarea.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiFormInputErrorMessageModule,
  ],
  declarations: [FormTextareaComponent],
  exports: [FormTextareaComponent],
})
export class SharedUiFormTextareaModule {}
