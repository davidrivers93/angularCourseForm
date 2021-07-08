import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  FormStateModel,
  FormStore,
  SetPasswordData,
} from '../../store/form.store';
import { VALIDATORS_MESSAGES } from '../../validators/messages';
import { passwordValidator } from '../../validators/password.validator';

@Component({
  selector: '[password]',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  password: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    const store: FormStateModel = this.store.selectSnapshot(FormStore);

    this.password = this.fb.group(
      {
        password: [store.password.value?.password, [Validators.required]],
        confirmPassword: [
          store.password.value?.confirmPassword,
          [Validators.required],
        ],
      },
      {
        validators: [Validators.required, passwordValidator],
      }
    );
    this.subscribeToChanges();
  }

  private subscribeToChanges(): void {
    this.password.valueChanges.subscribe(
      (value: { password: string; confirmPassword: string }) => {
        const valid = this.password.valid;
        this.store.dispatch(new SetPasswordData({ value, valid }));
      }
    );
  }
}
