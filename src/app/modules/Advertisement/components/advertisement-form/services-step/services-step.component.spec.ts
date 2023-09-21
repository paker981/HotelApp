import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ServicesStepComponent } from './services-step.component';
import { Services } from '@app/modules/Advertisement/types/advertisement';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ServicesStepComponent', () => {

  class ServicesStepComponentMock extends ServicesStepComponent {
    onServiceChangeMock(event: MatCheckboxChange, service: Services){
      this.onServiceChange(event,service);
    }
  }

  let component: ServicesStepComponentMock;
  let fixture: ComponentFixture<ServicesStepComponentMock>;

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [
        ServicesStepComponent,
        ServicesStepComponentMock
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesStepComponentMock);
    component = fixture.componentInstance;

    component.form = new FormArray([],Validators.required) as unknown as FormArray<FormControl<Services>>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add service to the form when checked', () => {
    // given
    const event: MatCheckboxChange = { checked: true } as MatCheckboxChange;
    const serviceToAdd = Services.BING;

    // when
    component.onServiceChangeMock(event, serviceToAdd);

    // then
    expect(component.form.controls.length).toBe(1);
    expect(component.form.value[0]).toBe(serviceToAdd);
  });

  it('should remove service from the form when unchecked', () => {
    // given
    const event: MatCheckboxChange = { checked: false } as MatCheckboxChange;
    const serviceToRemove = Services.BING;

    // when
    component.form.push(new FormControl(serviceToRemove) as FormControl<Services>);
    component.onServiceChangeMock(event, serviceToRemove);

    // then
    expect(component.form.controls.length).toBe(0);
  });

  it('should not remove service if it is not in the form when unchecked', () => {
    // given
    const event: MatCheckboxChange = { checked: false } as MatCheckboxChange;
    const serviceNotInForm = Services.GOOGLE;

    // when
    component.form.push(new FormControl(Services.BING) as FormControl<Services>);
    component.onServiceChangeMock(event, serviceNotInForm);

    // then
    expect(component.form.controls.length).toBe(1);
    expect(component.form.value[0]).toBe(Services.BING);
  });
});