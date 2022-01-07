import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() image = '';
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
}
