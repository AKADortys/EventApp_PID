import { Component, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { CommonModule } from '@angular/common';
import { searchQuery } from '../../../../models/responses.interface';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'], // corrigé ici
})
export class EventListComponent implements OnInit {
  events: any[] = []; // corrigé ici
  parameters!: searchQuery;
  error = '';
  isLoading = false;

  constructor(private readonly apiBack: ApiBackService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.isLoading = true;
    this.apiBack.getEvents().subscribe({
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
