import INotification from './INotification';

export type FirstOption = {
  context: string;
  property: string;
  value: string;
  message: string;
};

export type SecondOption = {
  context: string;
  property: string;
  value: string;
  quantity: number;
  message: string;
};

export type ThirdOption = {
  context: string;
  property: string;
  value: number;
  expected: number;
  message: string;
};

export default interface IContractValidator {
  isValid(context?: (ctx: string) => boolean): boolean;

  getNotifications(query?: (noty: INotification) => boolean): Array<INotification>;

  cleanNotifications(context?: (ctx: string) => boolean): IContractValidator;

  throwException(layer: string, context?: (ctx: string) => boolean): void;

  required(config: FirstOption): IContractValidator;

  hasMinLen(config: SecondOption): IContractValidator;

  hasMaxLen(config: SecondOption): IContractValidator;

  isFixedLen(config: SecondOption): IContractValidator;

  isGreaterThan(config: ThirdOption): IContractValidator;

  isEmail(config: FirstOption): IContractValidator;

  isIntenger(config: FirstOption): IContractValidator;

  isCellPhone(config: FirstOption): IContractValidator;

  isLandline(config: FirstOption): IContractValidator;

  isFederalTax(config: FirstOption): IContractValidator;

  isZipCode(config: FirstOption): IContractValidator;
}
