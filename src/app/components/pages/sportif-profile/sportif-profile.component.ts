import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/users.interface';
import { AuthUserService } from '../../../services/auth-user.service';
import { CommonModule } from '@angular/common';
import { UserRegistrationListComponent } from '../../partials/registration/user-registration-list/user-registration-list.component';
import { UserOverviewComponent } from '../../partials/user/user-overview/user-overview.component';

@Component({
  selector: 'app-sportif-profile',
  imports: [CommonModule, UserRegistrationListComponent, UserOverviewComponent],
  templateUrl: './sportif-profile.component.html',
  styleUrl: './sportif-profile.component.scss',
})
export class SportifProfileComponent implements OnInit {
  user!: User | null;

  constructor(private readonly authService: AuthUserService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (this.user) {
      console.log('utilsateur authentifié');
    }
  }
}
