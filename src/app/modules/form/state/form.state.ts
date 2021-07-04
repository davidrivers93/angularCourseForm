import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  SetPasswordDataState,
  SetPersonalDataState,
} from './actions/actions.state';

interface FormStep {
  valid: boolean;
  value: any;
}

export interface FormStateModel {
  personal: FormStep;
  password: FormStep;
  addresses: FormStep;
}

@State<FormStateModel>({
  name: 'FormStateModel',
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
}
