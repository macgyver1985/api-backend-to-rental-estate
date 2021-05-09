import INotification from './INotification';

export default interface IContractValidator {
  isValid(context?: (ctx: string) => boolean): boolean;

  isValidByQuery(query: (noty: INotification) => boolean): boolean;

  getNotifications(query?: (noty: INotification) => boolean): Array<INotification>;

  cleanNotifications(context?: (ctx: string) => boolean): IContractValidator;

  cleanNotificationsByQuery(query: (noty: INotification) => boolean): IContractValidator;

  throwException(layer: string, context?: (ctx: string) => boolean): void;

  required(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  hasMinLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator;

  hasMaxLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator;

  isFixedLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator;

  isGreaterThanOrEqual(config: {
    context: string;
    property: string;
    value: number;
    expected: number;
    message: string;
  }): IContractValidator;

  isLessThanOrEqual(config: {
    context: string;
    property: string;
    value: number;
    expected: number;
    message: string;
  }): IContractValidator;

  isEmail(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isIntenger(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isCellPhone(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isLandline(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isFederalTax(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isZipCode(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;

  isEquals(config: {
    context: string;
    property: string;
    value: string;
    expected: Array<string>;
    message: string;
  }): IContractValidator;

  isUUID(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator;
}
