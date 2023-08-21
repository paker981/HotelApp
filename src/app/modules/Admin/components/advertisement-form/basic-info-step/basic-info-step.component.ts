import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicStepData, BasicStepForm } from '@app/modules/Admin/types/advertisement';
import { endDateValidator, startDateValidator } from '@app/modules/Admin/validators/date-range.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, filter, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-basic-info-step',
  templateUrl: './basic-info-step.component.html',
  styleUrls: ['./basic-info-step.component.scss']
})
export class BasicInfoStepComponent implements OnInit{

  @Output() private formSubmitted: EventEmitter<BasicStepData> = new EventEmitter<BasicStepData>();

  protected form: FormGroup<BasicStepForm>;

  constructor(){
    this.form = new FormGroup<BasicStepForm>({
        title: new FormControl('', Validators.required) as FormControl<string>,
        description: new FormControl('', Validators.required) as FormControl<string>,
        startDate: new FormControl('' as unknown as Date, [Validators.required, startDateValidator()]) as FormControl<Date>,
        endDate: new FormControl('' as unknown as Date, [Validators.required, endDateValidator()]) as FormControl<Date>,
        duration: new FormControl(1,[Validators.required,Validators.min(1),Validators.max(10)]) as FormControl<number>,
    })

    this.form.controls.startDate.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(()=>this.form.controls.endDate.updateValueAndValidity({ onlySelf: true }))

    this.form.controls.endDate.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(()=>this.form.controls.startDate.updateValueAndValidity({ onlySelf: true }))
  }
  ngOnInit(): void {
    this.form.valueChanges.pipe(
      tap(console.log),
      filter(()=>this.form.valid),
      debounceTime(200),
      untilDestroyed(this),
    ).subscribe((form)=>this.formSubmitted.emit(form as BasicStepData))
  }

}
