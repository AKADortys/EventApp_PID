import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { AuthUserService } from '../../../../services/auth-user.service';
import { User } from '../../../../models/users.interface';
import Swal from 'sweetalert2';

@Component({
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  sports = [
    'football',
    'basketball',
    'tennis',
    'natation',
    'cyclisme',
    'course',
    'rugby',
    'autre',
  ];
  isEdit = false;
  eventId: string | null = null;
  user!: User | null;
  loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiBackService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthUserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.user = this.authService.getUser();
    this.eventId = this.route.snapshot.paramMap.get('id');
    if (this.eventId) {
      this.isEdit = true;
      this.api.getEventById(this.eventId).subscribe((event) => {
        this.eventForm.patchValue({
          ...event,
          date: new Date(event.date).toISOString().slice(0, 16),
        });
      });
    }
  }

  initForm() {
    this.eventForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', [Validators.required]],
      imageUrl: [''],
      location: ['', [Validators.required]],
      sportType: ['', [Validators.required]],
      maxParticipants: [1, [Validators.required, Validators.min(1)]],
    });
  }

  isInvalid(field: string): boolean {
    const control = this.eventForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getError(field: string): string {
    const control = this.eventForm.get(field);
    if (!control) return '';
    if (control.hasError('required')) return 'Ce champ est requis';
    if (control.hasError('minlength'))
      return `Minimum ${
        control.getError('minlength').requiredLength
      } caractères`;
    if (control.hasError('maxlength'))
      return `Maximum ${
        control.getError('maxlength').requiredLength
      } caractères`;
    if (control.hasError('min'))
      return `Valeur minimale : ${control.getError('min').min}`;
    return 'Champ invalide';
  }

  onSubmit() {
    this.loading = true;
    if (this.eventForm.invalid) return;

    const payload = {
      organizer: this.user?._id,
      ...this.eventForm.value,
    };

    const request = this.isEdit
      ? this.api.updateEvent(this.eventId, payload)
      : this.api.createEvent(payload);

    request.subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: `${this.isEdit ? 'Modification' : 'Création'} éffectuée !`,
        }).then(() => {
          this.router.navigate(['/dashboard/home']);
        });
      },
      error: (err) => {
        this.loading = false;
        console.error('Erreur lors de la soumission :', err.message);
        Swal.fire({
          icon: 'error',
          title: 'Erreur à la modification',
          text: err.message,
        });
      },
    });
  }
}
