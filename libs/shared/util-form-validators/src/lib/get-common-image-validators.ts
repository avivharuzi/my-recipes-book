import { ValidatorFn } from '@angular/forms';

import { FormValidators } from './form-validators';

export const getCommonImageValidators = (
  maxFiles: number = 1
): ValidatorFn[] => {
  return [
    FormValidators.maxFiles(maxFiles),
    FormValidators.maxFileSize('2MB'),
    FormValidators.allowedFileExtensions(['jpg', 'jpeg', 'png']),
    FormValidators.allowedMimetypes(['image/jpg', 'image/jpeg', 'image/png']),
  ];
};
