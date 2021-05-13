import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { CommandHelper } from '../helper';
import validationMessageResources from '../resources';

interface IAuthenticationCommand{
  userName: string;
  password: string;
}

export type AuthenticationData = {
  userName: string;
  password: string;
  processID?: string;
};

export class AuthenticationCommand extends CommandHelper
  implements IAuthenticationCommand {
    #userName: string;

    #password: string;

    private constructor(data: IAuthenticationCommand, processID?: string) {
      super(processID);

      this.#userName = data.userName;
      this.#password = data.password;
    }

    public get userName() : string {
      return this.#userName;
    }

    public get password() : string {
      return this.#password;
    }

    public static create(
      data: AuthenticationData,
      contractValidator: IContractValidator,
    ): AuthenticationCommand {
      const isValid = contractValidator
        .required({
          context: AuthenticationCommand.name,
          property: 'userName',
          message: validationMessageResources.USERNAME_REQUIRED,
          value: data.userName?.toString(),
        })
        .required({
          context: AuthenticationCommand.name,
          property: 'password',
          message: validationMessageResources.PASSWORD_REQUIRED,
          value: data.password?.toString(),
        })
        .isValid((t) => t === AuthenticationCommand.name);

      if (!isValid) {
        return null;
      }

      return new AuthenticationCommand({
        ...data,
      }, data.processID);
    }
}
