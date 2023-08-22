import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

// TODO: przekaż tutaj kontrolke/nazwe kontrolki
export function startDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const startDate = control.value as Date;
    const endDateControl = control.root.get('endDate');

    if (startDate && endDateControl?.value && startDate > endDateControl.value) {
      return { startDateError: true };
    }

    return null; // Validation passed
  };
}

export function endDateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const endDate = control.value as Date;
    const startDateControl = control.root.get('startDate');

    if (endDate && startDateControl?.value && endDate < startDateControl.value) {
      return { endDateError: true };
    }

    return null; // Validation passed
  };
}


  // validator na formGroup
  // validator na formControl laterThan(minDateCtrl) 
  // Validators.min(123);