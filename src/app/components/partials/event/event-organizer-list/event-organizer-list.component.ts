import { Component, OnInit } from '@angular/core';
import { searchQuery } from '../../../../models/responses.interface';
import { ApiBackService } from '../../../../services/api-back.service';
import { formatMongoDate } from '../../../../utils/date.util';
import { CommonModule } from '@angular/common';
import { User } from '../../../../models/users.interface';
import { AuthUserService } from '../../../../services/auth-user.service';
import { PaginationControlsComponentComponent } from '../../pagination-controls-component/pagination-controls-component.component';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-organizer-list',
  imports: [CommonModule, PaginationControlsComponentComponent, RouterModule],
  templateUrl: './event-organizer-list.component.html',
  styleUrl: './event-organizer-list.component.scss',
})
export class EventOrganizerListComponent implements OnInit {
  currentTime: Date = new Date();
  events: any[] = [];
  user!: User | null;
  parameters: searchQuery = {
    page: 1,
    total: 0,
    totalPages: 0,
    limit: 12,
  };
  error = '';
  isLoading = false;

  constructor(
    private readonly apiBack: ApiBackService,
    private readonly authService: AuthUserService,
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.getEvents('', this.parameters.page, this.parameters.limit);
  }

  onPageChanged(search: string, page: number, limit: number): void {
    this.getEvents(search, page, limit);
  }

  getEvents(search: string, page: number, limit: number): void {
    this.isLoading = true;
    this.apiBack
      .getEventByOrganizer(this.user?._id, page, limit, search)
      .subscribe({
        next: (response: any) => {
          const { data, ...rest } = response;
          data.forEach((item: any) => {
            item.fDate = formatMongoDate(item.date);
            item.date = new Date(item.date);
          });

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

  deleteEvent(id: string): void {
    Swal.fire({
      title: 'Etes vous sûre ?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiBack.deleteEvent(id).subscribe({
          next: (response) => {
            Swal.fire(
              response.message,
              "L'événement à été supprimé les participants inscrits seront avertis",
              'success',
            ).then(() => {
              this.getEvents('', this.parameters.page, this.parameters.limit);
            });
          },
          error: (err: Error) => {
            Swal.fire(err.message, '', 'error');
          },
        });
      } else {
        return;
      }
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
