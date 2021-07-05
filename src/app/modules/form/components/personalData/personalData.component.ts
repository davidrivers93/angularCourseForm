import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SetPersonalDataState } from '../../state/actions/actions.action';
import { minAgeValidator } from '../../validators/minAge/minAge.validator';

@Component({
  selector: '[personalData]',
  templateUrl: './personalData.component.html',
})
export class PersonalDataComponent implements OnInit {
  personalData: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToChanges();
  }

  private initForm(): void {
    this.personalData = this.fb.group({
      age: ['', { validators: [Validators.required, minAgeValidator(21)] }],
      name: ['', { validators: [Validators.required] }],
    });
  }

  private subscribeToChanges(): void {
    this.personalData.valueChanges.subscribe(
      (value: { age: string; name: string }) => {
        const valid = this.personalData.valid;
        this.store.dispatch(
          new SetPersonalDataState({
            valid,
            value,
          })
        );
      }
    );
  }
}
