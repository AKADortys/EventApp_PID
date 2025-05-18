import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormAthComponent } from './register-form-ath.component';

describe('RegisterFormAthComponent', () => {
  let component: RegisterFormAthComponent;
  let fixture: ComponentFixture<RegisterFormAthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormAthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFormAthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
