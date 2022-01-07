import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddCardComponent } from './add-card.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AddCardComponent],
  exports: [AddCardComponent],
})
export class SharedUiAddCardModule {}
