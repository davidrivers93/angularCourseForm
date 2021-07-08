import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import {
  FormStateModel,
  FormStore,
  SetPersonalData,
} from '../../store/form.store';
import { minAgeValidator } from '../../validators/minAge/minAge.validator';

@Component({
  selector: '[personalData]',
  templateUrl: './personalData.component.html',
})
export class PersonalDataComponent implements OnInit {
  personalData: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    const store: FormStateModel = this.store.selectSnapshot(FormStore);
    this.personalData = this.fb.group({
      age: [
        store.personalData.value?.age,
        { validators: [Validators.required, minAgeValidator(21)] },
      ],
      name: [
        store.personalData.value?.name,
        { validators: [Validators.required] },
      ],
    });
    this.subscribeToChanges();
  }

  private subscribeToChanges() {
    this.personalData.valueChanges.subscribe((value) => {
      const valid = this.personalData.valid;
      this.store.dispatch(
        new SetPersonalData({
          value,
          valid,
        })
      );
    });
  }
}
