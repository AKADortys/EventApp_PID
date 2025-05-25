import { Component } from '@angular/core';
import { UserOverviewComponent } from '../../partials/user/user-overview/user-overview.component';
import { EventOrganizerListComponent } from '../../partials/event/event-organizer-list/event-organizer-list.component';
import { OrganizerActionsEventComponent } from '../../partials/event/organizer-actions-event/organizer-actions-event.component';

@Component({
  selector: 'app-organizer-profile',
  imports: [
    UserOverviewComponent,
    EventOrganizerListComponent,
    OrganizerActionsEventComponent,
  ],
  templateUrl: './organizer-profile.component.html',
  styleUrl: './organizer-profile.component.scss',
})
export class OrganizerProfileComponent {}
