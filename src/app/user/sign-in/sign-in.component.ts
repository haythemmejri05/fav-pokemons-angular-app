import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  credentials: UserCredentials = { email: '', password: '' };
  signInError = false;

  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  signIn() {
    this.signInError = false;
    this.userSvc.signIn(this.credentials).subscribe({
      next: () => {
        this.authSvc.setUser(this.credentials.email);
        this.credentials = { email: '', password: '' };
        this.router.navigate(['/pokemons']);
      },
      error: () => (this.signInError = true),
    });
  }
}
