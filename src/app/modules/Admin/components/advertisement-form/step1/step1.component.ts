import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdvertisementForm } from '../../../types/advertisement';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Step1Component {
  @Input({required: true}) form!: FormGroup<AdvertisementForm>;
}
