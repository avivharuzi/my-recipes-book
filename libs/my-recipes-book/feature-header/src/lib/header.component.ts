import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@my-recipes-book/shared/data-access-auth';

@Component({
  selector: 'my-recipes-book-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  user$ = this.authService.user$;

  constructor(private readonly authService: AuthService) {}

  signOut(): void {
    this.authService.signOut().subscribe();
  }
}
