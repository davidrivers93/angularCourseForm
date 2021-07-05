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

import { FormState } from '../../state/form.state';
import { CurrentStep, Step } from '../../enum/steps';
import { SetNextStep, SetPreviousStep } from '../../state/actions/step.action';

@Component({
  selector: '[profile-form]',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<void>();

  @Select(FormState.currentStep)
  currentStep$: Observable<Step>;

  @Select(FormState.stepIsValid)
  stepIsValid$: Observable<CurrentStep>;

  CURRENT_STEP = CurrentStep;
  currentStep: string;

  form: FormGroup;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getCurrentStep();
  }

  onNext() {
    this.store.dispatch(new SetNextStep());
  }

  onBack() {
    this.store.dispatch(new SetPreviousStep());
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

  isCurrentStep(step: string): boolean {
    return step === this.currentStep;
  }

  private getCurrentStep(): void {
    this.currentStep$.subscribe(
      ({ current }: Step) => (this.currentStep = current)
    );
  }
}
