import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUiFormInputErrorMessageModule } from '@my-recipes-book/shared/ui/form-input-error-message';

import { FormInputComponent } from './form-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiFormInputErrorMessageModule,
  ],
  declarations: [FormInputComponent],
  exports: [FormInputComponent],
})
export class SharedUiFormInputModule {}
