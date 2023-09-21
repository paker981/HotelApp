import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { AdvertisementForm, BasicStepForm, Services } from '@app/modules/Advertisement/types/advertisement';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-services-step',
  templateUrl: './services-step.component.html',
  styleUrls: ['./services-step.component.scss']
})
export class ServicesStepComponent {
  
  protected services = Services;

  @Input({required: true}) form!: FormArray<FormControl<Services>>;

  protected onServiceChange(event: MatCheckboxChange, service: Services): void {
    const selectedServices = this.form;

    if (event.checked) {
      selectedServices.push(new FormControl(service) as FormControl<Services>);
      return;
    } 
    const index = selectedServices.controls.findIndex(control => control.value === service);
    if (index !== -1) {
      selectedServices.removeAt(index);
    }
  }
}
