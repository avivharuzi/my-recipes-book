import { Component } from '@angular/core';

import { CommonForm } from '@my-recipes-book/shared/util-form-helpers';

@Component({
  selector: 'shared-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss'],
})
export class FormTextareaComponent extends CommonForm<string> {}
