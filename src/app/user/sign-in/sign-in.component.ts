import { Component } from '@angular/core';
import { UserCredentials } from '../../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  credentials: UserCredentials = { email: '', password: '' };
  signInError: boolean = false;

  constructor(private userSvc: UserService, private router: Router) { }

  signIn() {
    this.signInError = false;
    this.userSvc.signIn(this.credentials).subscribe({
      next: () => this.router.navigate(['/pokemons']),
      error: () => this.signInError = true
    });
  }
}
