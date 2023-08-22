import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdvertisementForm } from '@app/modules/Advertisement/types/advertisement';

@Component({
  selector: 'app-summary-step',
  templateUrl: './summary-step.component.html',
  styleUrls: ['./summary-step.component.scss']
})
export class SummaryStepComponent {

  @Input({required: true}) form!: FormGroup<AdvertisementForm>;
}
