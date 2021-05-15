import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import validationMessageResources from '../resources';

interface ITokenEntity {
  identity: string;
  createdDate: Date;
  expiresDate: Date;
  expiresIn: number;
  claims: { [prop: string]: string };
}

export default class TokenEntity implements ITokenEntity {
  #identity: string;

  #createdDate: Date;

  #expiresDate: Date;

  #expiresIn: number;

  #claims: { [prop: string]: string };

  #contractValidator: IContractValidator;

  private constructor(
    identity: string,
    contractValidator: IContractValidator,
  ) {
    this.#identity = identity;
    this.#createdDate = new Date();
    this.#contractValidator = contractValidator;
  }

  public get identity(): string {
    return this.#identity;
  }

  public get createdDate(): Date {
    return this.#createdDate;
  }

  public get expiresDate(): Date {
    return this.#expiresDate;
  }

  public get expiresIn(): number {
    return (this.#expiresIn / 60000);
  }

  public get claims(): { [prop: string]: string; } {
    const clone = {};

    Object.assign(this.#claims, clone);

    return clone;
  }

  public static create(
    identity: string,
    contractValidator: IContractValidator,
  ): TokenEntity {
    const isValid = contractValidator
      .required({
        context: TokenEntity.name,
        property: 'identity',
        message: validationMessageResources.IDENTITY_REQUIRED,
        value: identity,
      }).isValid((t) => t === TokenEntity.name);

    if (!isValid) {
      return null;
    }

    return new TokenEntity(
      identity,
      contractValidator,
    );
  }

  public addClaim(props: { [prop: string]: string }): TokenEntity {
    const items = Object.entries(props)
      .filter((t) => this.#claims[t[0]] === undefined);
    const newProps = {};

    items.forEach((t) => {
      this.#contractValidator
        .required({
          context: TokenEntity.name,
          property: `claims.${t[0]}`,
          message: validationMessageResources.CLAIMS_PROP_REQUIRED,
          value: t[1],
        });

      newProps[t[0]] = t[1].toString();
    });

    this.#contractValidator
      .throwException('domain', (t) => t === TokenEntity.name);

    Object.assign(newProps, this.#claims);

    return this;
  }

  public setExpiresIn(minutes: number): TokenEntity {
    this.#contractValidator
      .required({
        context: TokenEntity.name,
        property: 'expiresIn',
        message: validationMessageResources.EXPIRES_IN_REQUIRED,
        value: minutes?.toString(),
      })
      .isIntenger({
        context: TokenEntity.name,
        property: 'expiresIn',
        message: validationMessageResources.EXPIRES_IN_INVALID,
        value: minutes?.toString(),
      })
      .throwException('domain', (t) => t === TokenEntity.name);

    this.#expiresIn = (minutes * 60000);

    this.#expiresDate = new Date(
      this.#createdDate.getTime() + this.#expiresIn,
    );

    return this;
  }
}
