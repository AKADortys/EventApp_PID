import { Component } from '@angular/core';
import { OrganizerActionsEventComponent } from '../../partials/event/organizer-actions-event/organizer-actions-event.component';
import { UserOverviewComponent } from '../../partials/user/user-overview/user-overview.component';
import { EventOrganizerListComponent } from '../../partials/event/event-organizer-list/event-organizer-list.component';

@Component({
  selector: 'app-admin-profile',
  imports: [
    OrganizerActionsEventComponent,
    UserOverviewComponent,
    EventOrganizerListComponent,
  ],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.scss',
})
export class AdminProfileComponent {}
