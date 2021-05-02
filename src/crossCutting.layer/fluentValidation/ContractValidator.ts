import ContractSupport from './ContractSupport';
import IContractValidator, { FirstOption, SecondOption, ThirdOption } from './interfaces/IContractValidator';
import IMessageResources from './interfaces/IMessageResources';
import INotification from './interfaces/INotification';
import INotificationDetail from './interfaces/INotificationDetail';

export default class ContractValidator implements IContractValidator {
  private hasValue(value: string): boolean {
    return value?.length > 0;
  }

  public required(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value) || Number(config.value) === 0) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public hasMinLen(config: SecondOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length < config.quantity) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public hasMaxLen(config: SecondOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length > config.quantity) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isFixedLen(config: SecondOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length !== config.quantity) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isGreaterThan(
    config: ThirdOption,
    notifications: Array<INotification>,
  ): IContractValidator {
    if (!this.hasValue(config.value?.toString())) {
      return this;
    }

    if (config.value <= config.expected) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isEmail(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.EMAIL_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isIntenger(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.INTENGER_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isCellPhone(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.CELL_PHONE_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isLandline(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.LANDLINE_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isFederalTax(
    config: FirstOption,
    notifications: Array<INotification>,
  ): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.INTENGER_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    } else if (config.value.length !== 11 && config.value.length !== 14) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    } else if (config.value.length === 11 && !ContractSupport.CpfIsValid(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    } else if (config.value.length === 14 && !ContractSupport.CnpjIsValid(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isZipCode(config: FirstOption, notifications: Array<INotification>): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.ZIP_CODE_PARTNER.test(config.value)) {
      notifications.push({
        context: config.context,
        property: config.property,
        errorCode: config.errorCode,
      });
    }

    return this;
  }

  public isValid(notifications: Array<INotification>): boolean {
    return notifications.length === 0;
  }

  public getNotificationDetails(
    notifications: Array<INotification>,
    resource: IMessageResources,
  ): Array<INotificationDetail> {
    if (resource) {
      const notDetails: Array<INotificationDetail> = notifications.map((t) => {
        const detail: INotificationDetail = {
          context: t.context,
          errorCode: t.errorCode,
          property: t.property,
          message: resource.items.find((rs) => rs.code === t.errorCode)?.message ?? null,
        };

        return detail;
      });

      return notDetails;
    }

    const notDetails: Array<INotificationDetail> = notifications
      .map((t) => ({
        context: t.context,
        errorCode: t.errorCode,
        message: null,
        property: t.property,
      }));

    return notDetails;
  }
}
