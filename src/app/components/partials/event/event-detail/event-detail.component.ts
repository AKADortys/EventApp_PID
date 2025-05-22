import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from '../../registration/registration-form/registration-form.component';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterModule, RegistrationFormComponent],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  @Input() eventId!: string;
  @Input() userId!: string | undefined;
  @Input() role!: string | undefined;
  event!: any | null;
  isLoading = false;
  error!: string | null;
  isResgister = false;

  constructor(private readonly apiBack: ApiBackService) {}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    this.error = null;
    this.isLoading = true;
    this.apiBack.getEventById(this.eventId).subscribe({
      next: (response: any) => {
        this.event = response;
        const isAlreadyRegis = this.event.participants.find(
          (n: any) => n._id === this.userId,
        );
        if (isAlreadyRegis) {
          this.isResgister = true;
        }
      },
      error: (err: Error) => {
        this.error = err.message;
        this.event = null;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
