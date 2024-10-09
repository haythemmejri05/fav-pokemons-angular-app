import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  credentials: UserCredentials = { email: '', password: '', passwordConfirmation: '' };
  signUpError: boolean = false;

  constructor(private userSvc: UserService, private router: Router) { }

  signUp() {
    this.signUpError = false;
    this.userSvc.signUp(this.credentials).subscribe({
      next: () => this.router.navigate(['/pokemons']),
      error: () => this.signUpError = true
    });
  }
}
