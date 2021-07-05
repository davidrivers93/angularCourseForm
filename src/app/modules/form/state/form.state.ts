import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProfileService } from '../../core/services/profile.service';
import { CurrentStep, Step, STEPS } from '../enum/steps';
import {
  SetAddressesDataState,
  SetPasswordDataState,
  SetPersonalDataState,
} from './actions/actions.action';
import { SetNextStep, SetPreviousStep } from './actions/step.action';
import { SubmitFormAction } from './actions/submit.action';

interface FormStep {
  valid: boolean;
  value: any;
}

export interface FormStateModel {
  personal: FormStep;
  password: FormStep;
  addresses: FormStep;
  currentStep: CurrentStep;
  createdId: number;
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
  createdId: null,
};

@State<FormStateModel>({
  name: 'FormStateModel',
  defaults: DEFAULT_VALUES,
})
@Injectable()
export class FormState {
  @Selector()
  static currentStep({ currentStep }: FormStateModel): Step {
    return STEPS[currentStep];
  }

  @Selector()
  static stepIsValid({ currentStep, ...ctx }: FormStateModel): boolean {
    return ctx[currentStep].valid;
  }

  constructor(private profileService: ProfileService) {}

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

  @Action(SubmitFormAction)
  submitForm(ctx: StateContext<FormStateModel>): Observable<{ id: number }> {
    const profile = createProfile(ctx.getState());
    return this.profileService.createProfile(profile).pipe(
      tap(({ id }) =>
        ctx.patchState({
          createdId: id,
        })
      )
    );
  }
}

function createProfile({ addresses, password, personal }: FormStateModel): any {
  return {
    age: personal.value.age,
    name: personal.value.name,
    addresses: addresses.value,
    password: password.value.password,
  };
}
