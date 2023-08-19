import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { AdvertisementForm } from '../types/advertisement';


export function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
  
    if (startDate === null && endDate === null) {
        return null; // Data zakończenia jest późniejsza niż data rozpoczęcia
      } else if (startDate  && endDate && startDate > endDate) {
        return { dateRange: true }; // Błąd - data zakończenia jest wcześniejsza niż data rozpoczęcia
      } else {
        return null; // Brak błędu, dopóki obie daty nie są dostępne i spełniają warunki
      }
  }


  // validator na formGroup
  // validator na formControl laterThan(minDateCtrl) 
  // Validators.min(123);