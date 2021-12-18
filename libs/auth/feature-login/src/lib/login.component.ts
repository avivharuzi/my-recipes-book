import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@my-recipes-book/shared/data-access-auth';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  constructor(private readonly authService: AuthService) {}

  signInWithGoogle(): void {
    this.authService.signInWithGoogle().subscribe();
  }
}
