import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { User } from '../../../../models/users.interface';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  @Input() userId!: string;
  user!: User;
  isLoading = false;
  error!: string | null;

  constructor(
    private readonly apiBack: ApiBackService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.apiBack.getUser(this.userId).subscribe({
      next: (response) => {
        this.user = response.data;
      },
      error: (err: Error) => {
        this.error = err.message;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  goBack(): void {
    this.location.back();
  }
}
