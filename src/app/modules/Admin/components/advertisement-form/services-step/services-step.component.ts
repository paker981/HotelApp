import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AdvertisementForm, Services } from '@app/modules/Admin/types/advertisement';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-services-step',
  templateUrl: './services-step.component.html',
  styleUrls: ['./services-step.component.scss']
})
export class ServicesStepComponent implements OnInit {
  
  protected services = Services;
  protected form: FormArray<FormControl<Services>> = new FormArray([],Validators.required) as unknown as FormArray<FormControl<Services>>;

  @Output() private formSubmitted: EventEmitter<Services[]> = new EventEmitter<Services[]>();

  protected onServiceChange(event: MatCheckboxChange, service: Services, index: number): void {
    const selectedServices = this.form;

    if (event.checked) {
      selectedServices.push(new FormControl(service) as FormControl<Services>);
    } else {
      const index = selectedServices.controls.findIndex(control => control.value === service);
      if (index !== -1) {
        selectedServices.removeAt(index);
      }
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.pipe(
      debounceTime(200),
      untilDestroyed(this),
    ).subscribe((value)=>this.formSubmitted.emit(value))
  }
   
}
