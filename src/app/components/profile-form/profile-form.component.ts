import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Profile } from 'src/app/models/profile.model';
import { VALIDATORS_MESSAGES } from 'src/app/validators/messages';
import { minAgeValidator } from 'src/app/validators/minAge.validator';
import { passwordValidator } from 'src/app/validators/password.validator';

const FORM_KEYS = {
  ADDRESSES: 'addresses',
  MIN_AGE: 'age',
};

interface FormProfile {
  age: number;
  password: { password: string; confirmPassword: string };
  addresses: any[];
}

@Component({
  selector: '[profile-form]',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  @Output() submitForm = new EventEmitter<Profile>();

  form: FormGroup;
  unsubscribe = new BehaviorSubject<any>(null);

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe.next(1);
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.initForm();
  }

  onRemoveAddress(index: number) {
    this.getAddressArray().removeAt(index);
  }

  addItem(): void {
    const group = this.formBuilder.group({
      direction: ['', [Validators.required]],
      postalCode: [''],
      city: '',
      country: '',
    });
    this.getAddressArray().push(group);
  }

  getAddressArray(): FormArray {
    return this.form.get(FORM_KEYS.ADDRESSES) as FormArray;
  }

  getControlErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (!control || control.errors === null) {
      return null;
    }

    const [firstError] = Object.entries(control.errors);

    return VALIDATORS_MESSAGES[firstError[0]](firstError[1]);
  }

  onSubmit(): void {
    const values = parseForm(this.form.value);
    this.submitForm.emit(values);
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      age: ['', { validators: [Validators.required, minAgeValidator(21)] }],
      addresses: this.formBuilder.array([]),
      password: this.formBuilder.group(
        {
          password: [''],
          confirmPassword: '',
        },
        {
          validators: [passwordValidator],
        }
      ),
    });

    this.addItem();
  }
}

function parseForm(formValue: FormProfile): Profile {
  return {
    age: formValue.age,
    addresses: formValue.addresses,
    password: formValue.password.password,
  };
}
