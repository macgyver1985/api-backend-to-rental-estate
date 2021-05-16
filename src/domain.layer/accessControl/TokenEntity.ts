import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { sign, verify } from 'jsonwebtoken';
import validationMessageResources from '../resources';

type Claims = { [prop: string]: string };

interface ITokenEntity {
  identity: string;
  createdDate: Date;
  expiresDate: Date;
  expiresIn: number;
  authorization: string;
  claims: Claims;
}

type TokenLoad = {
  identity: string;
  createdDate: Date;
  expiresDate: Date;
  expiresIn: number;
  claims: string;
};

export default class TokenEntity implements ITokenEntity {
  #identity: string;

  #createdDate: Date;

  #expiresDate: Date;

  #expiresIn: number;

  #authorization: string;

  #claims: { [prop: string]: string };

  #contractValidator: IContractValidator;

  private constructor(
    data: ITokenEntity,
    contractValidator: IContractValidator,
  ) {
    this.#identity = data.identity;
    this.#expiresIn = data.expiresIn;
    this.#expiresDate = data.expiresDate;
    this.#createdDate = data.createdDate;
    this.#authorization = data.authorization;
    this.#contractValidator = contractValidator;
    this.#claims = {};

    Object.assign(data.claims, this.#claims);
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

  public get authorization(): string {
    return this.#authorization;
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
      })
      .isValid((t) => t === TokenEntity.name);

    if (!isValid) {
      return null;
    }

    return new TokenEntity({
      identity,
      createdDate: new Date(),
      authorization: null,
      expiresDate: null,
      claims: {},
      expiresIn: null,
    }, contractValidator);
  }

  public static validate(
    authorization: string,
    secretKey: string,
    contractValidator: IContractValidator,
  ): TokenEntity {
    let data: TokenLoad = null;

    try {
      data = verify(authorization, secretKey) as TokenLoad;
    } catch (err) {
      contractValidator
        .addNotification({
          context: TokenEntity.name,
          property: 'authorization',
          message: validationMessageResources.AUTHORIZATION_INVALID,
        });
    }

    contractValidator
      .throwException('domain', (t) => t === TokenEntity.name);

    return new TokenEntity({
      authorization,
      claims: <Claims>JSON.parse(data.claims),
      createdDate: data.createdDate,
      expiresDate: data.expiresDate,
      expiresIn: data.expiresIn,
      identity: data.identity,
    },
    contractValidator);
  }

  public addClaim(props: { [prop: string]: string }): TokenEntity {
    const items = Object.entries(props)
      .filter((t) => this.#claims[t[0]] === undefined);

    items.forEach((t) => {
      this.#contractValidator
        .required({
          context: TokenEntity.name,
          property: `claims.${t[0]}`,
          message: validationMessageResources.CLAIMS_PROP_REQUIRED,
          value: t[1],
        });

      this.#claims[t[0]] = t[1].toString();
    });

    this.#contractValidator
      .throwException('domain', (t) => t === TokenEntity.name);

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

  public authorizationBuilder(secretKey: string): TokenEntity {
    this.#contractValidator
      .required({
        context: TokenEntity.name,
        property: 'expiresIn',
        message: validationMessageResources.EXPIRES_IN_REQUIRED,
        value: this.#expiresIn?.toString(),
      })
      .required({
        context: TokenEntity.name,
        property: 'secretKey',
        message: validationMessageResources.SECRET_REQUIRED,
        value: secretKey,
      })
      .throwException('domain', (t) => t === TokenEntity.name);

    const load: TokenLoad = {
      claims: JSON.stringify(this.#claims),
      createdDate: this.#createdDate,
      expiresDate: this.#expiresDate,
      expiresIn: this.#expiresIn,
      identity: this.#identity,
    };

    this.#authorization = sign(load, secretKey, {
      expiresIn: `${this.expiresIn}min`,
    });

    return this;
  }
}
