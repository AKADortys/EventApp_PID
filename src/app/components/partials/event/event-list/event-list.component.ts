import { Component, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { searchQuery } from '../../../../models/responses.interface';
import { FormsModule } from '@angular/forms';
import { PaginationControlsComponentComponent } from '../../pagination-controls-component/pagination-controls-component.component';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, PaginationControlsComponentComponent, FormsModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'], // corrigé ici
})
export class EventListComponent implements OnInit {
  events: any[] = []; // corrigé ici
  parameters: searchQuery = {
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 12,
  };
  error = '';
  isLoading = false;

  constructor(private readonly apiBack: ApiBackService) {}

  ngOnInit(): void {
    this.getEvents('', this.parameters.page, this.parameters.limit);
  }

  onPageChanged(search: string, page: number, limit: number): void {
    this.getEvents(search, page, limit);
  }

  getEvents(search: string, page: number, limit: number): void {
    this.isLoading = true;
    this.apiBack.getEvents(search, page, limit).subscribe({
      next: (response: any) => {
        const { data, ...rest } = response;
        this.events = data;
        this.parameters = rest;
        this.error = '';
      },
      error: (err: Error) => {
        this.error = err.message;
        this.events = [];
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
