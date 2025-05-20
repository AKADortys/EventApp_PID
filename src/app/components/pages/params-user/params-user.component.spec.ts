import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsUserComponent } from './params-user.component';

describe('ParamsUserComponent', () => {
  let component: ParamsUserComponent;
  let fixture: ComponentFixture<ParamsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamsUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParamsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
