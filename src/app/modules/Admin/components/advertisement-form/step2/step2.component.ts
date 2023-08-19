import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdvertisementForm, Services } from '../../../types/advertisement';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step2Component {
  protected services = Services;

  @Input({required: true}) form!: FormGroup<AdvertisementForm>;

  protected onServiceChange(event: MatCheckboxChange, service: Services, index: number): void {
    const selectedServices = this.form.controls.selectedServices;

    if (event.checked) {
      selectedServices.push(new FormControl(service) as FormControl<Services>);
    } else {
      const index = selectedServices.controls.findIndex(control => control.value === service);
      if (index !== -1) {
        selectedServices.removeAt(index);
      }
    }
  }
}
