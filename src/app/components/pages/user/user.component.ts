import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { UserDetailsComponent } from '../../partials/user/user-details/user-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [UserDetailsComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  userId!: string;
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const sub = this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id') ?? '';
    });

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
