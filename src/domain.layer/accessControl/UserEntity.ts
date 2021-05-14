import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { IEntity } from '../interfaces';
import validationMessageResources from '../resources';

interface IUserEntity extends IEntity{
  userName: string;
  password: string;
  partnerId: string;
}

export type UserData = {
  id: string;
  userName: string;
  password: string;
  partnerId: string;
};

export class UserEntity implements IUserEntity {
    #id: string;

    #userName: string;

    #password: string;

    #partnerId: string;

    private constructor(data: IUserEntity) {
      this.#id = data.id;
      this.#userName = data.userName;
      this.#password = data.password;
      this.#partnerId = data.partnerId;
    }

    public get id(): string {
      return this.#id;
    }

    public get userName(): string {
      return this.#userName;
    }

    public get password(): string {
      return this.#password;
    }

    public get partnerId(): string {
      return this.#partnerId;
    }

    public static create(
      data: UserData,
      contractValidator: IContractValidator,
    ): UserEntity {
      const id = !data?.id || data.id === '' ? uuidv4() : data.id;
      const isValid = contractValidator
        .required({
          context: UserEntity.name,
          property: 'userName',
          message: validationMessageResources.USERNAME_REQUIRED,
          value: data.userName?.toString(),
        })
        .required({
          context: UserEntity.name,
          property: 'password',
          message: validationMessageResources.PASSWORD_REQUIRED,
          value: data.password?.toString(),
        })
        .required({
          context: UserEntity.name,
          property: 'partnerId',
          message: validationMessageResources.PARTNER_ID_REQUIRED,
          value: data.partnerId?.toString(),
        })
        .isValid((t) => t === UserEntity.name);

      if (!isValid) {
        return null;
      }

      return new UserEntity({
        ...data,
        id,
      });
    }
}
