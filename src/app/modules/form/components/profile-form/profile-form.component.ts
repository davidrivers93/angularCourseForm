import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Profile } from '../../../core/models/profile.model';
import { minAgeValidator } from '../../validators/minAge/minAge.validator';
import { passwordValidator } from '../../validators/password.validator';

const FORM_KEYS = {
  PERSONAL_DATA: 0,
  PASSWORD: 1,
  ADDRESSES: 2,
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

  step = 0;
  maximumStep = 0;

  form: FormGroup;
  unsubscribe = new BehaviorSubject<any>(null);

  FORM_KEYS = FORM_KEYS;

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe.next(1);
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.initForm();
    this.maximumStep = Object.values(FORM_KEYS).length;
  }

  onRemoveAddress(index: number) {
    this.getAddressArray().removeAt(index);
  }

  onNext() {
    this.step++;
  }

  onBack() {
    this.step--;
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
    return this.form.get(`${FORM_KEYS.ADDRESSES}`) as FormArray;
  }

  getPasswordsGroup(): FormGroup {
    return this.form.get(`${FORM_KEYS.PASSWORD}`) as FormGroup;
  }

  onSubmit(): void {
    const values = parseForm(this.form.value);
    this.submitForm.emit(values);
  }

  canChangeStep(): boolean {
    return this.form.get(`${this.step}`).valid;
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      0: this.formBuilder.group({
        age: ['', { validators: [Validators.required, minAgeValidator(21)] }],
        name: ['', { validators: [Validators.required] }],
      }),
      1: this.formBuilder.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        {
          validators: [Validators.required, passwordValidator],
        }
      ),
      2: this.formBuilder.array([]),
    });
    this.addItem();
  }
}

function parseForm(formValue: FormProfile): Profile {
  return {
    age: formValue[FORM_KEYS.PERSONAL_DATA].age,
    name: formValue[FORM_KEYS.PERSONAL_DATA].name,
    addresses: formValue[FORM_KEYS.ADDRESSES],
    password: formValue[FORM_KEYS.PASSWORD].password,
  };
}
