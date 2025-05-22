import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  imports: [CommonModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit {
  @Input() eventId!: string;
  @Input() userId!: string | undefined;
  @Input() isRegister!: boolean;
  registration!: any | null;
  isLoading = false;
  error!: string | null;

  constructor(
    private readonly apiBack: ApiBackService,
    private readonly router: Router, // injection du Router
  ) {}

  ngOnInit(): void {
    if (this.isRegister) {
      this.findRegistration();
    }
  }

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

  unRegisterEvent(): void {
    this.error = null;
    this.isLoading = true;
    this.apiBack.deleteRegistration(this.registration._id).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Vous êtes retiré(e) de la liste des participants',
        }).then(() => {
          this.router.navigate(['dashboard/home']);
        });
      },
      error: (err: Error) => {
        this.error = err.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  findRegistration(): void {
    this.isLoading = true;
    this.apiBack
      .findRegistration({ eventId: this.eventId, userId: this.userId })
      .subscribe({
        next: (response: any) => {
          const { data } = response;
          this.registration = data;
        },
        error: (err: Error) => {
          this.error = err.message;
          this.registration = null;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
