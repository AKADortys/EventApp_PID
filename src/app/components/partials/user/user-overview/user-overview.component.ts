import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/users.interface';
import { AuthUserService } from '../../../../services/auth-user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-overview',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-overview.component.html',
  styleUrl: './user-overview.component.scss',
})
export class UserOverviewComponent implements OnInit {
  user!: User | null;

  constructor(private readonly authService: AuthUserService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }
}
