import { FormControl } from '@angular/forms';
import { minAgeValidator } from './minAge.validator';

describe('MinAgeValidator', () => {
  it('should return false', () => {
    const control = {
      value: 22,
    } as FormControl;

    const result = minAgeValidator(18)(control);

    expect(result).toBeFalsy();
  });

  it('should return true', () => {
    const control = {
      value: 15,
    } as FormControl;

    const result = minAgeValidator(18)(control);

    expect(result).toBeTruthy();
  });
});
