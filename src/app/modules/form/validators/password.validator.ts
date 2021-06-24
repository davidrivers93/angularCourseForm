import { FormGroup } from '@angular/forms';

export function passwordValidator({ value }: FormGroup) {
  const { password, confirmPassword } = value;

  return password === confirmPassword ? null : { password: true };
}
