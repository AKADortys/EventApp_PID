import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdtFormComponent } from './user-updt-form.component';

describe('UserUpdtFormComponent', () => {
  let component: UserUpdtFormComponent;
  let fixture: ComponentFixture<UserUpdtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserUpdtFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserUpdtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
