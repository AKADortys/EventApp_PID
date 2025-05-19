import { Component } from '@angular/core';
import { EventListComponent } from '../../partials/event/event-list/event-list.component';

@Component({
  selector: 'app-home',
  imports: [EventListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
