import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementForm, BasicStepData, BasicStepForm, Services } from '../../types/advertisement';
// import { AdvertisementForm, Services } from '@advertisementTypes/advertisement';
import { Room, RoomState } from 'src/app/modules/shared/Rooms/types/room.types';
import { ActivatedRoute, Router } from '@angular/router';
import { endDateValidator, startDateValidator } from '../../validators/date-range.validator';
// import { dateRangeValidator } from '@Validators/date-range.validator';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomSnackBarComponent } from '@components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, throttleTime } from 'rxjs';
import { Location } from '@angular/common';

@UntilDestroy()
@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-container.component.html',
  styleUrls: ['./advertisement-container.component.scss']
})
export class AdvertisementContainerComponent {

  protected form: FormGroup<AdvertisementForm>;
  protected availableRooms!: Room[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private location: Location
    ) {
      // TODO: robić na osobne formGroup dla każdego step'a 
      // rozkminiaj żeby stepComponenty nie wiedziały zbyt dużo nie potrzebnie o innych stepach
    this.form = new FormGroup<AdvertisementForm>({
        basicStep:  new FormGroup<BasicStepForm>({
          title: new FormControl('', Validators.required) as FormControl<string>,
          description: new FormControl('', Validators.required) as FormControl<string>,
          startDate: new FormControl('' as unknown as Date, [Validators.required, startDateValidator()]) as FormControl<Date>,
          endDate: new FormControl('' as unknown as Date, [Validators.required, endDateValidator()]) as FormControl<Date>,
          duration: new FormControl(1,[Validators.required,Validators.min(1),Validators.max(10)]) as FormControl<number>,
        }),
        selectedServices: new FormArray([],Validators.required) as unknown as FormArray<FormControl<Services>>,
        selectedRooms: new FormArray([]) as unknown as FormArray<FormControl<Room>>
    })
  }


  onSubmit(): void {
    if (this.form.invalid) {
      CustomSnackBarComponent.openErrorSnackBar(this.snackBar,'Form invalid','Close!')
      return;
    }

    console.log(this.form.value);
    this.form.reset();
    this.location.back()
  }


}


