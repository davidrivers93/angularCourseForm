import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  FormStore,
  SetNextStep,
  SetPreviousStep,
  StepName,
} from '../../store/form.store';

@Component({
  selector: '[profile-form]',
  templateUrl: './profile-form.component.html',
})
export class ProfileFormComponent implements OnInit {
  @Output() submitForm = new EventEmitter<void>();

  @Select(FormStore.formIsValid) formIsValid$: Observable<boolean>;
  @Select(FormStore.hasNextStep) hasNextStep$: Observable<boolean>;
  @Select(FormStore.hasPreviousStep) hasPreviousStep$: Observable<boolean>;
  @Select(FormStore.formStepIsValid) formStepIsValid$: Observable<boolean>;
  @Select(FormStore.currentStep) currentStep$: Observable<string>;

  private currentStep: string;

  StepName = StepName;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.currentStep$.subscribe(
      (currentStep) => (this.currentStep = currentStep)
    );
  }

  onNext() {
    this.store.dispatch(new SetNextStep());
  }

  onBack() {
    this.store.dispatch(new SetPreviousStep());
  }

  isCurrentStep(step: string): boolean {
    return this.currentStep === step;
  }

  onSubmit(): void {
    this.submitForm.emit();
  }

  canChangeStep(): boolean {
    return true;
  }
}
