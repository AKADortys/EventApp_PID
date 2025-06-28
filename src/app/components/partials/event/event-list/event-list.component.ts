import { Component, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { searchQuery } from '../../../../models/responses.interface';
import { FormsModule } from '@angular/forms';
import { PaginationControlsComponentComponent } from '../../pagination-controls-component/pagination-controls-component.component';
import { formatMongoDate } from '../../../../utils/date.util';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    PaginationControlsComponentComponent,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent implements OnInit {
  currentTime: Date = new Date();
  events!: any[] | null;
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
        data.forEach((item: any) => {
          item.fDate = formatMongoDate(item.date);
          item.date = new Date(item.date);
        });

        this.events = data;
        this.parameters = rest;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.error = err.message;
        this.events = null;
        this.isLoading = false;
      },
    });
  }

  nextPage(): void {
    if (this.parameters.totalPages <= this.parameters.page) return;
    this.parameters.page++;
    this.getEvents('', this.parameters.page, this.parameters.limit);
    return;
  }

  prevPage(): void {
    if (this.parameters.page <= 0) return;
    this.parameters.page--;
    this.getEvents('', this.parameters.page, this.parameters.limit);
  }
}
