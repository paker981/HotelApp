import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdvertisementForm } from '../../../types/advertisement';

@Component({
  selector: 'app-step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.scss'],
})
export class Step4Component {

  @Input({required: true}) form!: FormGroup<AdvertisementForm>;
}
