import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderComponent } from './loader.component';
import { LoaderDirective } from './loader.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [LoaderComponent, LoaderDirective],
  exports: [LoaderDirective],
})
export class SharedUiLoaderModule {}
