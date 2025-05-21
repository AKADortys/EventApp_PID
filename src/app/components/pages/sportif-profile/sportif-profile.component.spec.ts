import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportifProfileComponent } from './sportif-profile.component';

describe('SportifProfileComponent', () => {
  let component: SportifProfileComponent;
  let fixture: ComponentFixture<SportifProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportifProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportifProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
