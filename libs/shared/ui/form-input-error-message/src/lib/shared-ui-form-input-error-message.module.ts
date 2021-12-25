import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormInputErrorMessagePipe } from './form-input-error-message.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [FormInputErrorMessagePipe],
  exports: [FormInputErrorMessagePipe],
})
export class SharedUiFormInputErrorMessageModule {}
