import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormInputErrorMessagePipe } from './form-input-error-message.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormInputErrorMessagePipe],
  exports: [FormInputErrorMessagePipe],
})
export class SharedUiFormInputErrorMessageModule {}
