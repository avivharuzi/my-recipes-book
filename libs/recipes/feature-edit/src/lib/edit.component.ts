import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'recipes-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent {}
