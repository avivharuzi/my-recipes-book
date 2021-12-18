import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [FormComponent],
  exports: [FormComponent],
})
export class RecipesUiFormModule {}
