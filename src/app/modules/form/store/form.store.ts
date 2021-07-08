import { Injectable } from '@angular/core';
import { Action, Select, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Profile } from '../../core/models/profile.model';
import { ProfileService } from '../../core/services/profile.service';

export enum StepName {
  PERSONAL_DATA = 'personalData',
  PASSWORD = 'password',
  ADDRESSES = 'addresses',
}

export interface FormStateModel {
  personalData: { value: any; valid: boolean };
  password: { value: any; valid: boolean };
  addresses: { value: any; valid: boolean };
  newProfileId: number;
  currentStep: string;
}

const DEFAULT_VALUES = {
  personalData: {
    value: null,
    valid: false,
  },
  password: {
    value: null,
    valid: false,
  },
  addresses: {
    value: [],
    valid: false,
  },
  newProfileId: null,
  currentStep: StepName.PERSONAL_DATA,
};

interface Step {
  next: string;
  previous: string;
  current: string;
}

export const Steps: { [key: string]: Step } = {
  [StepName.PERSONAL_DATA]: {
    current: StepName.PERSONAL_DATA,
    next: StepName.PASSWORD,
    previous: null,
  },
  [StepName.PASSWORD]: {
    current: StepName.PASSWORD,
    next: StepName.ADDRESSES,
    previous: StepName.PERSONAL_DATA,
  },
  [StepName.ADDRESSES]: {
    current: StepName.ADDRESSES,
    next: null,
    previous: StepName.PASSWORD,
  },
};

export class SetPasswordData {
  static readonly type = '[FORM STATE] Set password data';
  constructor(public password: { value: any; valid: boolean }) {}
}

export class SetPersonalData {
  static readonly type = '[FORM STATE] Set personal data';
  constructor(public personalData: { value: any; valid: boolean }) {}
}

export class SetAddressesData {
  static readonly type = '[FORM STATE] Set addresses data';
  constructor(public addresses: { value: any[]; valid: boolean }) {}
}

export class CreateProfile {
  static readonly type = '[FORM STATE] Create a new profile';
}

export class SetNextStep {
  static readonly type = '[FORM STATE] Set next step';
}

export class SetPreviousStep {
  static readonly type = '[FORM STATE] Set previous step';
}

export class SetFirstStep {
  static readonly type = '[FORM STATE] Set first step';
}

@Injectable()
@State<FormStateModel>({
  name: 'FormStateModel',
  defaults: DEFAULT_VALUES,
})
export class FormStore {
  @Selector()
  static formIsValid(ctx: FormStateModel): boolean {
    return ctx.addresses.valid && ctx.password.valid && ctx.personalData.valid;
  }

  @Selector()
  static formStepIsValid(ctx: FormStateModel): boolean {
    return ctx[ctx.currentStep].valid;
  }

  @Selector()
  static hasNextStep(ctx: FormStateModel): boolean {
    return !!Steps[ctx.currentStep].next;
  }

  @Selector()
  static hasPreviousStep(ctx: FormStateModel): boolean {
    return !!Steps[ctx.currentStep].previous;
  }

  @Selector()
  static currentStep(ctx: FormStateModel): string {
    return ctx.currentStep;
  }

  constructor(private profileService: ProfileService) {}

  @Action(SetPasswordData)
  setPasswordData(
    context: StateContext<FormStateModel>,
    { password }: SetPasswordData
  ) {
    context.patchState({ password });
  }

  @Action(SetPersonalData)
  setPersonalData(
    context: StateContext<FormStateModel>,
    { personalData }: SetPersonalData
  ) {
    context.patchState({ personalData });
  }

  setAddressesData(
    context: StateContext<FormStateModel>,
    { addresses }: SetAddressesData
  ) {
    context.patchState({ addresses });
  }

  createProfile(context: StateContext<FormStateModel>) {
    const state = context.getState();
    const profile = parseForm(state);
    return this.profileService.createProfile(profile).pipe(
      tap(({ id }) =>
        context.patchState({
          newProfileId: id,
        })
      ),
      tap(() => context.dispatch(new SetFirstStep()))
    );
  }

  @Action(SetNextStep)
  setNextStep(context: StateContext<FormStateModel>): void {
    const stepConfig = Steps[context.getState().currentStep];
    context.patchState({
      currentStep: stepConfig.next,
    });
  }

  @Action(SetPreviousStep)
  setPreviousStep(context: StateContext<FormStateModel>): void {
    const stepConfig = Steps[context.getState().currentStep];
    context.patchState({
      currentStep: stepConfig.previous,
    });
  }

  @Action(SetFirstStep)
  setFirstStep(context: StateContext<FormStateModel>): void {
    context.patchState({
      currentStep: StepName.PERSONAL_DATA,
    });
  }
}

function parseForm(formValue: FormStateModel): Profile {
  return {
    age: formValue.personalData.value.age,
    name: formValue.personalData.value.name,
    addresses: formValue.addresses.value,
    password: formValue.password.value.password,
  };
}
