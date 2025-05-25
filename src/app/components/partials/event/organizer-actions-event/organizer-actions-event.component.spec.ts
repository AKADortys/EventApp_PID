import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerActionsEventComponent } from './organizer-actions-event.component';

describe('OrganizerActionsEventComponent', () => {
  let component: OrganizerActionsEventComponent;
  let fixture: ComponentFixture<OrganizerActionsEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizerActionsEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerActionsEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
