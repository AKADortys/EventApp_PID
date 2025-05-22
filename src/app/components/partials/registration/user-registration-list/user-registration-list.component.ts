import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { searchQuery } from '../../../../models/responses.interface';
import { ApiBackService } from '../../../../services/api-back.service';
import { PaginationControlsComponentComponent } from '../../pagination-controls-component/pagination-controls-component.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-registration-list',
  imports: [CommonModule, PaginationControlsComponentComponent, RouterModule],
  templateUrl: './user-registration-list.component.html',
  styleUrl: './user-registration-list.component.scss',
})
export class UserRegistrationListComponent implements OnInit {
  @Input() userId!: string;
  parameters: searchQuery = {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  };
  registrations!: any;
  isLoading = false;
  error!: string;

  constructor(private readonly apiBack: ApiBackService) {}

  ngOnInit(): void {
    if (this.userId) {
      this.getRegistrations(
        this.userId,
        this.parameters.page,
        this.parameters.limit,
        '',
      );
    }
  }

  getRegistrations(
    id: string,
    page: number,
    limit: number,
    search: string,
  ): void {
    this.isLoading = true;
    this.apiBack.getUserRegistrations(id, page, limit, search).subscribe({
      next: (response: any) => {
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
}
