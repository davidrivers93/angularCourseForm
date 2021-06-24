import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { VALIDATORS_MESSAGES } from '../../validators/messages';

@Component({
  selector: '[password]',
  templateUrl: './password.component.html',
})
export class PasswordComponent {
  @Input() password: FormGroup;

  getControlError(): string {
    if (!this.password || this.password.errors === null) {
      return null;
    }

    const [firstError] = Object.entries(this.password.errors);

    return VALIDATORS_MESSAGES[firstError[0]](firstError[1]);
  }
}
