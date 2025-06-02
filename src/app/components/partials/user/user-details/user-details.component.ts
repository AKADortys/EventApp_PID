import { Component, Input, OnInit } from '@angular/core';
import { ApiBackService } from '../../../../services/api-back.service';
import { User } from '../../../../models/users.interface';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {
  @Input() userId!: string;
  user!: User;
  isLoading = false;
  error!: string | null;

  constructor(private readonly apiBack: ApiBackService) {}

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
}
