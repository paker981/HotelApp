import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsStepComponent } from './rooms-step.component';

describe('RoomsStepComponent', () => {
  let component: RoomsStepComponent;
  let fixture: ComponentFixture<RoomsStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoomsStepComponent]
    });
    fixture = TestBed.createComponent(RoomsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
