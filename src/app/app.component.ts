import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { User } from './models/users.interface';
import { ApiBackService } from './services/api-back.service';
import { AuthUserService } from './services/auth-user.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'EventApp';
  user!: User | null;
  constructor(
    private readonly authUserService: AuthUserService,
    private readonly apiBackService: ApiBackService,
  ) {}

  ngOnInit(): void {
    this.authUserService.user$.subscribe((user) => (this.user = user));
  }

  logout() {
    this.apiBackService.logout().subscribe({
      next: () => {
        this.authUserService.logout();
        Swal.fire({
          icon: 'success',
          title: 'Déconnexion réussie !',
          text: 'Vous êtes déconnecté(e)',
        });
        window.location.href = '/';
      },
      error: (err: Error) => {
        console.error('Erreur lors de la déconnexion', err.message);
        Swal.fire({
          icon: 'error',
          title: 'Déconnexion échouée !',
          text: `une erreur s'est produite: ${err.message}`,
        });
      },
    });
  }
}
