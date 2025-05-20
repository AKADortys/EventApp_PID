import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from './models/users.interface';
import { ApiBackService } from './services/api-back.service';
import { AuthUserService } from './services/auth-user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'EventApp';
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
      error: (err: Error) => {
        console.error('Erreur lors de la déconnexion', err.message);
      },
    });
  }
}
