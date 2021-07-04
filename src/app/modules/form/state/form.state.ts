import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CurrentStep, Step, STEPS } from '../enum/steps';
import {
  SetAddressesDataState,
  SetPasswordDataState,
  SetPersonalDataState,
} from './actions/actions.state';
import { SetNextStep, SetPreviousStep } from './actions/step.state';

interface FormStep {
  valid: boolean;
  value: any;
}

export interface FormStateModel {
  personal: FormStep;
  password: FormStep;
  addresses: FormStep;
  currentStep: CurrentStep;
}

const DEFAULT_VALUES: FormStateModel = {
  [CurrentStep.PERSONAL]: {
    valid: false,
    value: null,
  },
  [CurrentStep.PASSWORD]: {
    valid: false,
    value: null,
  },
  [CurrentStep.ADDRESSES]: {
    valid: false,
    value: null,
  },
  currentStep: CurrentStep.PERSONAL,
};

@State<FormStateModel>({
  name: 'FormStateModel',
  defaults: DEFAULT_VALUES,
})
export class FormState {
  @Selector()
  static currentStep({ currentStep }: FormStateModel): Step {
    return STEPS[currentStep];
  }

  @Selector()
  static stepIsValid({ currentStep, ...ctx }: FormStateModel): boolean {
    return ctx[currentStep].valid;
  }

  @Action(SetPersonalDataState)
  setPersonalDataState(
    ctx: StateContext<FormStateModel>,
    { personal }: SetPersonalDataState
  ): void {
    ctx.patchState({
      personal,
    });
  }

  @Action(SetPasswordDataState)
  setPasswordDataState(
    ctx: StateContext<FormStateModel>,
    { password }: SetPasswordDataState
  ): void {
    ctx.patchState({
      password,
    });
  }

  @Action(SetAddressesDataState)
  setAddressesDataState(
    ctx: StateContext<FormStateModel>,
    { addresses }: SetAddressesDataState
  ): void {
    ctx.patchState({
      addresses,
    });
  }

  @Action(SetNextStep)
  setNextStep(ctx: StateContext<FormStateModel>): void {
    const step = ctx.getState().currentStep;
    ctx.patchState({
      currentStep: STEPS[step].next,
    });
  }

  @Action(SetPreviousStep)
  setPreviousStep(ctx: StateContext<FormStateModel>): void {
    const step = ctx.getState().currentStep;
    ctx.patchState({
      currentStep: STEPS[step].previous,
    });
  }
}
