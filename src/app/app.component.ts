import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  form: FormArray;
  unsubscribe = new BehaviorSubject<any>(null);

  title = 'clase2';

  constructor(private formBuilder: FormBuilder) {}

  ngOnDestroy(): void {
    this.unsubscribe.next(1);
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.form = this.formBuilder.array([]);
    this.addItem();
  }

  getFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  onRemoveAddress(index: number) {
    this.form.removeAt(index);
  }

  addItem(): void {
    const group = this.formBuilder.group({
      direction: ['', [Validators.required]],
      postalCode: '',
      city: '',
      country: '',
    });
    this.form.push(group);

    group.valueChanges.subscribe((valor) => console.log(valor));
  }
}
