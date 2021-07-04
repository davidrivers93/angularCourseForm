import { CurrentStep } from '../form.state';

export class SetCurrentStep {
  static readonly type = '[FORM STATE] Set current step';
  constructor(public currentStep: CurrentStep) {}
}
