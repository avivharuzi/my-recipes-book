import { Component, Input } from '@angular/core';

import { CommonForm } from '@my-recipes-book/shared/util-form-helpers';

@Component({
  selector: 'shared-form-input-file',
  templateUrl: './form-input-file.component.html',
  styleUrls: ['./form-input-file.component.scss'],
})
export class FormInputFileComponent extends CommonForm<File[]> {
  @Input() multiple = false;

  override value: File[] = [];

  onFileChange(event: Event): void {
    const fileList: FileList = (event.target as HTMLInputElement)
      .files as FileList;
    if (!fileList || fileList.length === 0) {
      this.onChange([]);
      return;
    }

    const files: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      files.push(fileList.item(i) as File);
    }
    this.onChange(files);
  }
}
