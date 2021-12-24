import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'my-recipes-book-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
