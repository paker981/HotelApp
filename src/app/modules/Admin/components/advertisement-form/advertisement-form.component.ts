import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdvertisementForm, Services } from '../../types/advertisement';
// import { AdvertisementForm, Services } from '@advertisementTypes/advertisement';
import { Room, RoomState } from 'src/app/modules/Rooms/types/room.types';
import { ActivatedRoute, Router } from '@angular/router';
import { dateRangeValidator } from '../../validators/date-range.validator';
// import { dateRangeValidator } from '@Validators/date-range.validator';
import { RoomService } from 'src/app/modules/Rooms/services/room.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { CustomSnackBarComponent } from 'src/app/components/custom-snack-bar/custom-snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.scss']
})
export class AdvertisementFormComponent {

  protected form: FormGroup<AdvertisementForm>;
  protected availableRooms!: Room[];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    ) {
      // TODO: robić na osobne formGroup dla każdego step'a 
      // rozkminiaj żeby stepComponenty nie wiedziały zbyt dużo nie potrzebnie o innych stepach
    this.form = new FormGroup<AdvertisementForm>({
        title: new FormControl('', Validators.required) as FormControl<string>,
        description: new FormControl('', Validators.required) as FormControl<string>,
        startDate: new FormControl('' as unknown as Date, [Validators.required, dateRangeValidator]) as FormControl<Date>,
        endDate: new FormControl('' as unknown as Date, [Validators.required, dateRangeValidator]) as FormControl<Date>,
        duration: new FormControl(1,[Validators.required,Validators.min(1),Validators.max(10)]) as FormControl<number>,
        selectedServices: new FormArray([],Validators.required) as unknown as FormArray<FormControl<Services>>,
        selectedRooms: new FormArray([]) as unknown as FormArray<FormControl<Room>>
    },
    {validators: dateRangeValidator}
    )
  }


  onSubmit(): void {
    if (this.form.invalid) {
      CustomSnackBarComponent.openErrorSnackBar(this.snackBar,'Form invalid','Close!')
      return;
    }

    this.form.reset();
    const role = this.route.snapshot.paramMap.get('role');
    this.router.navigate([`/dashboard/${role}/rooms`]); //location.back()
  }

}


