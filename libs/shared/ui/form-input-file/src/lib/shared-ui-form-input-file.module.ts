import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedUiFormInputErrorMessageModule } from '@my-recipes-book/shared/ui/form-input-error-message';

import { FormInputFileComponent } from './form-input-file.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedUiFormInputErrorMessageModule,
  ],
  declarations: [FormInputFileComponent],
  exports: [FormInputFileComponent],
})
export class SharedUiFormInputFileModule {}
