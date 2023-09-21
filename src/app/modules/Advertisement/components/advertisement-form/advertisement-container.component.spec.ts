import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvertisementContainerComponent } from './advertisement-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormArray, Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertisementForm, BasicStepForm, Services } from '../../types/advertisement';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@app/modules/Material/material.module';
import { CustomSnackBarComponent } from '@app/components/custom-snack-bar/custom-snack-bar.component';
import { AdvertisementModule } from '../../advertisement.module';
import { SummaryStepComponent } from './summary-step/summary-step.component';
import { BasicInfoStepComponent } from './basic-info-step/basic-info-step.component';
import { RoomsStepComponent } from './rooms-step/rooms-step.component';
import { ServicesStepComponent } from './services-step/services-step.component';
import { SharedModule } from '@app/modules/shared/shared.module';
import { CdkStepper, CdkStepperModule, StepContentPositionState } from '@angular/cdk/stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { Room } from '@app/modules/shared/Rooms/types/room.types';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('AdvertisementContainerComponent', () => {

  class AdvertisementContainerComponentMock extends AdvertisementContainerComponent {
    setFormValue(value: FormGroup<AdvertisementForm>){
      this.form.controls.basicStep.controls.title.setValue(value.controls.basicStep.controls.title.value);
      this.form.controls.basicStep.controls.description.setValue(value.controls.basicStep.controls.description.value);
      this.form.controls.basicStep.controls.startDate.setValue(value.controls.basicStep.controls.startDate.value);
      this.form.controls.basicStep.controls.endDate.setValue(value.controls.basicStep.controls.endDate.value);
      this.form.controls.basicStep.controls.duration.setValue(value.controls.basicStep.controls.duration.value);
      this.form.controls.selectedServices.push(new FormControl(value.controls.selectedServices.value[0]) as FormControl<Services>);
    }

    get formValid (){
      return this.form.valid;
    }
  }

  const locationMock = {
    back: jest.fn()
  }

  const snackBarMock = {
    openFromComponent: jest.fn()
  }

  const invalidForm: FormGroup<AdvertisementForm> = 
    new FormGroup({
    basicStep:  new FormGroup<BasicStepForm>({
      title: new FormControl('') as FormControl<string>,
      description: new FormControl('') as FormControl<string>,
      startDate: new FormControl('' as unknown as Date) as FormControl<Date>,
      endDate: new FormControl('' as unknown as Date) as FormControl<Date>,
      duration: new FormControl(1) as FormControl<number>,
    }),
    selectedServices: new FormArray([]) as unknown as FormArray<FormControl<Services>>,
    selectedRooms: new FormArray([]) as unknown as FormArray<FormControl<Room>>
  })

  const validForm: FormGroup<AdvertisementForm> = 
    new FormGroup({
    basicStep:  new FormGroup<BasicStepForm>({
      title: new FormControl('Example Title') as FormControl<string>,
      description: new FormControl('Example desc') as FormControl<string>,
      startDate: new FormControl(new Date('2023-09-05')) as FormControl<Date>,
      endDate: new FormControl(new Date('2023-09-10')) as FormControl<Date>,
      duration: new FormControl(1) as FormControl<number>,
    }),
    selectedServices: new FormArray([new FormControl(Services.BING)]) as unknown as FormArray<FormControl<Services>>,
    selectedRooms: new FormArray([]) as unknown as FormArray<FormControl<Room>>
  })
  

  let component: AdvertisementContainerComponentMock;
  let fixture: ComponentFixture<AdvertisementContainerComponentMock>;


  beforeEach(() => {
    jest.clearAllMocks();
     TestBed.configureTestingModule({
      declarations: [
        AdvertisementContainerComponent,
        AdvertisementContainerComponentMock
      ],
      imports: [
        ReactiveFormsModule,
        MatStepperModule,
        NoopAnimationsModule
        ],
      providers: [
        {
          provide: Location,
          useValue: locationMock
        },
        {
          provide: MatSnackBar,
          useValue: snackBarMock
        },
        {
          provide: CdkStepper,
          useValue: () => {}
        }],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvertisementContainerComponentMock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error snackbar if form is invalid', () => {
    // when
    component.setFormValue(invalidForm)
    component.onSubmit();

    // then
    expect(snackBarMock.openFromComponent).toHaveBeenCalled();
    expect(locationMock.back).not.toHaveBeenCalled();
    expect(component.formValid).toBe(false);
  });

  it('should reset form and go back when form is valid', () => {
    // when
    component.setFormValue(validForm)
    component.onSubmit();

    // then
    expect(snackBarMock.openFromComponent).not.toHaveBeenCalled();
    expect(locationMock.back).toHaveBeenCalled();
    expect(component.formValid).toBe(false);
  });
});
