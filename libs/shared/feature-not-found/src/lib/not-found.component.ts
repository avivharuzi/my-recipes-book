import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
