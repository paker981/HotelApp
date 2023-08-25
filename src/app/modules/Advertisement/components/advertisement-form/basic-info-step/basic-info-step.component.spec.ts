import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoStepComponent } from './basic-info-step.component';

describe('BasicInfoStepComponent', () => {
  let component: BasicInfoStepComponent;
  let fixture: ComponentFixture<BasicInfoStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoStepComponent]
    });
    fixture = TestBed.createComponent(BasicInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
