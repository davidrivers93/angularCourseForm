import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../../../core/models/profile.model';

import { FormState } from '../../state/form.state';
import { CurrentStep } from '../../enum/steps';
import { SetNextStep, SetPreviousStep } from '../../state/actions/step.state';

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

  @Select(FormState.currentStep)
  currentStep$: Observable<CurrentStep>;

  @Select(FormState.stepIsValid)
  stepIsValid$: Observable<CurrentStep>;

  step = 0;
  maximumStep = 0;

  form: FormGroup;
  unsubscribe = new BehaviorSubject<any>(null);

  FORM_KEYS = FORM_KEYS;

  constructor(private store: Store) {}

  ngOnDestroy(): void {
    this.unsubscribe.next(1);
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.maximumStep = Object.values(FORM_KEYS).length;
  }

  onRemoveAddress(index: number) {
    this.getAddressArray().removeAt(index);
  }

  onNext() {
    this.store.dispatch(new SetNextStep());
    this.step++;
  }

  onBack() {
    this.store.dispatch(new SetPreviousStep());

    this.step--;
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
}

function parseForm(formValue: FormProfile): Profile {
  return {
    age: formValue[FORM_KEYS.PERSONAL_DATA].age,
    name: formValue[FORM_KEYS.PERSONAL_DATA].name,
    addresses: formValue[FORM_KEYS.ADDRESSES],
    password: formValue[FORM_KEYS.PASSWORD].password,
  };
}
