import { Form, FormControl } from '@angular/forms';

/* export function minAgeValidator(control: FormControl): {
  [key: string]: boolean;
} {
    const age = 18
  return value > min ? null : { minAge: { min } }
} */

export function minAgeValidator(min: number) {
  return ({ value }: FormControl) => agnosticAgeValidator(value, min);
}

export function agnosticAgeValidator(value: number, min: number) {
  return value > min ? null : { minAge: { min } };
}
