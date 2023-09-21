import { FormControl, FormGroup } from '@angular/forms';
import { startDateValidator, endDateValidator } from './date-range.validator';


describe('DateRangeValidator', () => {
  const dateForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  dateForm.controls.startDate.setValidators([
    startDateValidator(dateForm.controls.endDate),
  ]);
  dateForm.controls.endDate.setValidators([
    endDateValidator(dateForm.controls.startDate),
  ]);

    it('should controls return error when date is invalid', () => {
      // given
      dateForm.controls.startDate.setValue(new Date('2023-09-10'));
      dateForm.controls.endDate.setValue(new Date('2023-09-05'));

      // when
      dateForm.controls.startDate.updateValueAndValidity();
      dateForm.controls.endDate.updateValueAndValidity();
        
      // then
      expect(dateForm.controls.startDate.hasError('startDateError')).toBeTruthy();
      expect(dateForm.controls.endDate.hasError('endDateError')).toBeTruthy();
    });
  });
