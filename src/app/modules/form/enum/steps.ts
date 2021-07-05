export enum CurrentStep {
  PERSONAL = 'personal',
  PASSWORD = 'password',
  ADDRESSES = 'addresses',
}

export interface Step {
  previous: CurrentStep;
  next: CurrentStep;
  current: CurrentStep;
}

export const STEPS: { [key: string]: Step } = {
  [CurrentStep.PERSONAL]: {
    current: CurrentStep.PERSONAL,
    previous: null,
    next: CurrentStep.PASSWORD,
  },
  [CurrentStep.PASSWORD]: {
    current: CurrentStep.PASSWORD,
    previous: CurrentStep.PERSONAL,
    next: CurrentStep.ADDRESSES,
  },
  [CurrentStep.ADDRESSES]: {
    current: CurrentStep.ADDRESSES,
    previous: CurrentStep.PASSWORD,
    next: null,
  },
};
