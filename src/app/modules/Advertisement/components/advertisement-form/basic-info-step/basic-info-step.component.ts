import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicStepData, BasicStepForm } from '@app/modules/Advertisement/types/advertisement';
import { endDateValidator, startDateValidator } from '@app/modules/Advertisement/validators/date-range.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.scss']
})
export class BasicInfoStepComponent implements OnInit{
 // input z formem
  @Input({required: true}) form!: FormGroup<BasicStepForm>;

  constructor(){}

  ngOnInit(): void {
    this.form.controls.startDate.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(()=>this.form.controls.endDate.updateValueAndValidity({ onlySelf: true }))

    this.form.controls.endDate.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(()=>this.form.controls.startDate.updateValueAndValidity({ onlySelf: true }))
    
  }
}
