export class SetPersonalDataState {
  static readonly type = '[FORM STATE] Set personal data state';
  constructor(public personal: { valid: boolean; value: any }) {}
}

export class SetPasswordDataState {
  static readonly type = '[FORM STATE] Set password data state';
  constructor(public password: { valid: boolean; value: any }) {}
}

export class SetAddressesDataState {
  static readonly type = '[FORM STATE] Set addresses data state';
  constructor(public addresses: { valid: boolean; value: any }) {}
}
