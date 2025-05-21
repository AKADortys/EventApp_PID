import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { AuthUserService } from '../../../services/auth-user.service';
import { User } from '../../../models/users.interface';
import { ActivatedRoute } from '@angular/router';
import { EventDetailComponent } from '../../partials/event/event-detail/event-detail.component';
import { EventRegistrationListComponent } from '../../partials/event/event-registration-list/event-registration-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule, EventDetailComponent, EventRegistrationListComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  private route = inject(ActivatedRoute);
  eventId!: string;
  user!: User | null;
  error = '';
  isLoading = false;

  constructor(private readonly authService: AuthUserService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    const sub = this.route.paramMap.subscribe((params) => {
      this.eventId = params.get('id') ?? '';
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
