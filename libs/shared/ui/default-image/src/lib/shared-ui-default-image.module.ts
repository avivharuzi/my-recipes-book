import { NgModule } from '@angular/core';

import { DefaultImageDirective } from './default-image.directive';

@NgModule({
  declarations: [DefaultImageDirective],
  exports: [DefaultImageDirective],
})
export class SharedUiDefaultImageModule {}
