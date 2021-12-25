import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'shared-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardComponent {}
