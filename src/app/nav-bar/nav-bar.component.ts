import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  user: User | null = null;
  showSignOutMenu: boolean = false;

  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.getUser().subscribe({
      next: (user) => { this.user = user }
    });
  }

  toggleSignOutMenu() {
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut() {
    this.userSvc.signOut();
    this.showSignOutMenu = false;
  }
}
