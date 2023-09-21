import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { BasicInfoStepComponent } from './basic-info-step.component'; // Załóżmy, że używasz ngx-take-until-destroy
import { debounceTime } from 'rxjs/operators';
import { BasicStepForm } from '@app/modules/Advertisement/types/advertisement';
import { MaterialModule } from '@app/modules/Material/material.module';
import { untilDestroyed } from '@ngneat/until-destroy/lib/until-destroyed';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BasicInfoStepComponent', () => {
  let component: BasicInfoStepComponent;
  let fixture: ComponentFixture<BasicInfoStepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicInfoStepComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule
    ],
    schemas:[NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(BasicInfoStepComponent);
    component = fixture.componentInstance;
    

     component.form = new FormGroup<BasicStepForm>({
        title: new FormControl<string>('') as FormControl<string>,
        description: new FormControl<string>('') as FormControl<string>,
        startDate: new FormControl<Date>(new Date()) as FormControl<Date>,
        endDate: new FormControl<Date>(new Date()) as FormControl<Date>,
        duration: new FormControl<number>(0) as FormControl<number>,
      });

      fixture.detectChanges();//onPush...

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should update endDate validity when startDate changes', () => {
  //   const endDateControl = form.controls.endDate;

  //   // Ustaw początkową datę
  //   form.controls.endDate.setValue(new Date());
  //   form.controls.startDate.setValue(new Date(new Date().getDay() + 1));

  //   fixture.detectChanges();

  //   console.log(form.controls.startDate.value, form.controls.endDate.value)

  //   // Oczekujemy, że endDate zostanie zaktualizowany w odpowiedzi na zmianę startDate
  //   expect(endDateControl.valid).toBe(false);
  // });


  // it('should update startDate validity when endDate changes', () => {
  //   const startDateControl = form.controls.startDate;
  //   form.controls.startDate.setValue(new Date('08.08.2023'));
  //   form.controls.endDate.setValue(new Date('07.08.2023'));
  //   fixture.detectChanges();
  //   console.log(form.controls.startDate.value, form.controls.endDate.value)
  //   expect(startDateControl.valid).toBe(false);
  // });


});