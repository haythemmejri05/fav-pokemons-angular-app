import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  user: User | null = null;

  constructor(
    private userSvc: UserService,
    private authSvc: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSvc.getUser().subscribe({
      next: user => {
        this.user = user;
      },
    });
  }

  signOut() {
    this.userSvc.signOut();
    this.authSvc.logout();
    this.router.navigate(['/sign-in']);
  }
}
