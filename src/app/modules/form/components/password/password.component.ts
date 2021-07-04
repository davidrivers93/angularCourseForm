import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetPasswordDataState } from '../../state/actions/actions.state';
import { VALIDATORS_MESSAGES } from '../../validators/messages';
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: '[password]',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  password: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToChanges();
  }

  private initForm(): void {
    this.password = this.fb.group(
      {
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: [Validators.required, passwordValidator],
      }
    );
  }

  private subscribeToChanges(): void {
    this.password.valueChanges.subscribe(
      (value: { password: string; confirmPassword: string }) => {
        const valid = this.password.valid;
        this.store.dispatch(
          new SetPasswordDataState({
            valid,
            value,
          })
        );
      }
    );
  }
}
