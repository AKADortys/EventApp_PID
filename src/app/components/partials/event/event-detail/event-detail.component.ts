import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent implements OnInit {
  @Input() eventId!: string;
  event!: any | null;
  isLoading = false;
  error!: string | null;

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
        console.log(response);
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
