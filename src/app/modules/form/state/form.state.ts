import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetAddressesDataState,
  SetPasswordDataState,
  SetPersonalDataState,
} from './actions/actions.state';
import { SetCurrentStep } from './actions/step.state';

interface FormStep {
  valid: boolean;
  value: any;
}

export type CurrentStep = 'personal' | 'password' | 'addresses';

export interface FormStateModel {
  personal: FormStep;
  password: FormStep;
  addresses: FormStep;
  currentStep: CurrentStep;
}

const DEFAULT_VALUES: FormStateModel = {
  addresses: {
    valid: false,
    value: null,
  },
  password: {
    valid: false,
    value: null,
  },
  personal: {
    valid: false,
    value: null,
  },
  currentStep: 'personal',
};

@State<FormStateModel>({
  name: 'FormStateModel',
  defaults: DEFAULT_VALUES,
})
export class FormState {
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

  @Action(SetCurrentStep)
  setCurrentStep(
    ctx: StateContext<FormStateModel>,
    { currentStep }: SetCurrentStep
  ): void {
    ctx.patchState({
      currentStep,
    });
  }
}
