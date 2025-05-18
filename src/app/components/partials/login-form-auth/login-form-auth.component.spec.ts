import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormAuthComponent } from './login-form-auth.component';

describe('LoginFormAuthComponent', () => {
  let component: LoginFormAuthComponent;
  let fixture: ComponentFixture<LoginFormAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFormAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFormAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
