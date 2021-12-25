import { Component, Input } from '@angular/core';

import { CommonForm } from '@my-recipes-book/shared/util-form-helpers';

@Component({
  selector: 'shared-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent extends CommonForm<string> {
  @Input() type = 'text';
}
