import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { searchQuery } from '../../../../models/responses.interface';
import { CommonModule } from '@angular/common';
import { PaginationControlsComponentComponent } from '../../pagination-controls-component/pagination-controls-component.component';

@Component({
  selector: 'app-event-registration-list',
  imports: [CommonModule, PaginationControlsComponentComponent],
  templateUrl: './event-registration-list.component.html',
  styleUrl: './event-registration-list.component.scss',
})
export class EventRegistrationListComponent implements OnInit {
  @Input() eventId!: string;
  registrations: any | null;
  parameters: searchQuery = {
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 12,
  };
  error!: string | null;
  isLoading = false;

  constructor(private readonly apiBack: ApiBackService) {}

  pageChanged(page: number, limit: number, search: string): void {
    this.getRegistration(page, limit, search);
  }

  ngOnInit(): void {
    this.getRegistration(this.parameters.page, this.parameters.limit, '');
  }

  getRegistration(page: number, limit: number, search: string): void {
    this.apiBack
      .getEventRegistrations(this.eventId, page, limit, search)
      .subscribe({
        next: (response) => {
          this.isLoading = true;
          const { data, ...rest } = response;
          this.registrations = data;
          this.parameters = rest;
        },
        error: (err: Error) => {
          this.error = err.message;
          this.registrations = null;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  nextPage(): void {
    if (this.parameters.totalPages <= this.parameters.page) return;
    this.parameters.page++;
    this.getRegistration(this.parameters.page, this.parameters.limit, '');
    return;
  }

  prevPage(): void {
    if (this.parameters.page <= 0) return;
    this.parameters.page--;
    this.getRegistration(this.parameters.page, this.parameters.limit, '');
    return;
  }
}
