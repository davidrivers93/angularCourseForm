export enum CurrentStep {
  PERSONAL = 'personal',
  PASSWORD = 'password',
  ADDRESSES = 'addresses',
}

export interface Step {
  previous: CurrentStep;
  next: CurrentStep;
}

export const STEPS: { [key: string]: Step } = {
  [CurrentStep.PERSONAL]: {
    previous: null,
    next: CurrentStep.PASSWORD,
  },
  [CurrentStep.PASSWORD]: {
    previous: CurrentStep.PERSONAL,
    next: CurrentStep.ADDRESSES,
  },
  [CurrentStep.ADDRESSES]: {
    previous: CurrentStep.PASSWORD,
    next: null,
  },
};
