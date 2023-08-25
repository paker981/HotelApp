import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: przekaż tutaj kontrolke/nazwe kontrolki
export function startDateValidator(endControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.value as Date;
    const endDateControl = endControl;

    if (startDate && endDateControl?.value && startDate > endDateControl.value) {
      return { startDateError: true };
    }

    return null; // Validation passed
  };
}

export function endDateValidator(startControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const endDate = control.value as Date;
    const startDateControl = startControl

    if (endDate && startDateControl?.value && endDate < startDateControl.value) {
      return { endDateError: true };
    }

    return null; // Validation passed
  };
}


  // validator na formGroup
  // validator na formControl laterThan(minDateCtrl) 
  // Validators.min(123);