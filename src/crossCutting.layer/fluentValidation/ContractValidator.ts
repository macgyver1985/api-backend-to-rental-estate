import { injectable } from 'inversify';
import ContractSupport from './ContractSupport';
import ContractValidatorException from './ContractValidatorException';
import { IContractValidator, INotification } from './interfaces';

@injectable()
export default class ContractValidator implements IContractValidator {
  #notifications: Array<INotification>;

  public constructor() {
    this.#notifications = [];
  }

  public isValid(context?: (ctx: string) => boolean): boolean {
    if (!context) { return this.#notifications.length === 0; }

    return this.#notifications.filter((t) => context(t.context))?.length === 0;
  }

  public isValidByQuery(query: (noty: INotification) => boolean): boolean {
    return this.#notifications.filter(query)?.length === 0;
  }

  public getNotifications(query?: (noty: INotification) => boolean): INotification[] {
    if (!query) { return this.#notifications; }

    const result = this.#notifications.filter(query);

    return result;
  }

  public cleanNotifications(context?: (ctx: string) => boolean): IContractValidator {
    this.#notifications = context ? this.#notifications.filter((t) => !context(t.context)) : [];

    return this;
  }

  public cleanNotificationsByQuery(query: (noty: INotification) => boolean): IContractValidator {
    this.#notifications = this.#notifications.filter((t) => !query(t));

    return this;
  }

  public throwException(layer: string, context?: (ctx: string) => boolean): void {
    if (!this.isValid(context)) {
      const query = context ? (t: INotification) => context(t.context) : null;
      const notify = this.getNotifications(query);

      this.cleanNotifications(context);

      throw new ContractValidatorException(layer, notify);
    }
  }

  private hasValue(value: string): boolean {
    return value?.length > 0;
  }

  public required(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public hasMinLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length < config.quantity) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public hasMaxLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length > config.quantity) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isFixedLen(config: {
    context: string;
    property: string;
    value: string;
    quantity: number;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (config.value.length !== config.quantity) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isGreaterThanOrEqual(config: {
    context: string;
    property: string;
    value: number;
    expected: number;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value?.toString())) {
      return this;
    }

    if (config.value < config.expected) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isLessThanOrEqual(config: {
    context: string;
    property: string;
    value: number;
    expected: number;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value?.toString())) {
      return this;
    }

    if (config.value > config.expected) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isEmail(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.EMAIL_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isIntenger(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.INTENGER_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isCellPhone(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.CELL_PHONE_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isLandline(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.LANDLINE_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isFederalTax(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.INTENGER_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    } else if (config.value.length !== 11 && config.value.length !== 14) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    } else if (config.value.length === 11 && !ContractSupport.CpfIsValid(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    } else if (config.value.length === 14 && !ContractSupport.CnpjIsValid(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isZipCode(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.ZIP_CODE_PARTNER.test(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isEquals(config: {
    context: string;
    property: string;
    value: string;
    expected: string[];
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!config.expected.find((t) => t === config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }

  public isUUID(config: {
    context: string;
    property: string;
    value: string;
    message: string;
  }): IContractValidator {
    if (!this.hasValue(config.value)) {
      return this;
    }

    if (!ContractSupport.isUUID(config.value)) {
      this.#notifications.push({
        context: config.context,
        property: config.property,
        message: config.message,
      });
    }

    return this;
  }
}
