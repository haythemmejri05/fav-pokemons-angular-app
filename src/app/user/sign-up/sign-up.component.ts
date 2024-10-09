import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  credentials: UserCredentials = {
    email: '',
    password: '',
    passwordConfirmation: '',
  };
  signUpError = false;

  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  signUp() {
    this.signUpError = false;
    this.userSvc.signUp(this.credentials).subscribe({
      next: () => {
        this.authSvc.setUser(this.credentials.email);
        this.credentials = { email: '', password: '' };
        this.router.navigate(['/pokemons']);
      },
      error: () => (this.signUpError = true),
    });
  }
}
