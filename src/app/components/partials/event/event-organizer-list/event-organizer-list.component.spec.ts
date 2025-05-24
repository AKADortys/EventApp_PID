import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrganizerListComponent } from './event-organizer-list.component';

describe('EventOrganizerListComponent', () => {
  let component: EventOrganizerListComponent;
  let fixture: ComponentFixture<EventOrganizerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrganizerListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOrganizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
