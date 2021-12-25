import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formInputErrorMessage',
})
export class FormInputErrorMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string {
    if (errors === null) {
      return '';
    }

    const errorsValues = Object.values(errors).filter(
      (error) => typeof error === 'string' || error instanceof String
    );

    if (errorsValues.length === 0) {
      return '';
    }

    return errorsValues[0];
  }
}
