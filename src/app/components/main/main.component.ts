import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthUserService } from '../../services/auth-user.service';
import { User } from '../../models/users.interface';
import { ApiBackService } from '../../services/api-back.service';

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  user!: User | null;
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly apiBackService: ApiBackService,
  ) {
    this.user = this.authUserService.getUser();
  }

  logout() {
    this.apiBackService.logout().subscribe({
      next: () => {
        this.authUserService.logout();
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err.message);
      },
    });
  }
}
