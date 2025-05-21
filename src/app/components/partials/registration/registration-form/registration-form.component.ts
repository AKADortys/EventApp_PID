import { Component, Input } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration-form',
  imports: [],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent {
  @Input() eventId!: string;
  @Input() userId!: string | undefined;
  isLoading = false;
  error!: string | null;

  constructor(
    private readonly apiBack: ApiBackService,
    private readonly router: Router, // injection du Router
  ) {}

  registerEvent(): void {
    this.isLoading = true;
    this.apiBack
      .createRegistration({ event: this.eventId, user: this.userId })
      .subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            title: response.message,
            text: "Votre inscription sera validée par l'organisateur de l'événement",
          }).then(() => {
            this.router.navigate(['/dashboard/home']);
          });
        },
        error: (err: Error) => {
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: err.message,
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
