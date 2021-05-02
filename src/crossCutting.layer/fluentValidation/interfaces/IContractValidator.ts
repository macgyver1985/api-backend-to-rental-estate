import IMessageResources from './IMessageResources';
import INotification from './INotification';
import INotificationDetail from './INotificationDetail';

export type FirstOption = {
  context: string;
  property: string;
  value: string;
  errorCode: string;
};

export type SecondOption = {
  context: string;
  property: string;
  value: string;
  quantity: number;
  errorCode: string;
};

export type ThirdOption = {
  context: string;
  property: string;
  value: number;
  expected: number;
  errorCode: string;
};

export default interface IContractValidator {
  required(config: FirstOption, notifications: Array<INotification>): IContractValidator

  hasMinLen(config: SecondOption, notifications: Array<INotification>): IContractValidator

  hasMaxLen(config: SecondOption, notifications: Array<INotification>): IContractValidator

  isFixedLen(config: SecondOption, notifications: Array<INotification>): IContractValidator

  isGreaterThan(config: ThirdOption, notifications: Array<INotification>): IContractValidator

  isEmail(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isIntenger(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isCellPhone(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isLandline(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isFederalTax(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isZipCode(config: FirstOption, notifications: Array<INotification>): IContractValidator

  isValid(notifications: Array<INotification>): boolean

  getNotificationDetails(
    notifications: Array<INotification>,
    resource: IMessageResources
  ): Array<INotificationDetail>
}
