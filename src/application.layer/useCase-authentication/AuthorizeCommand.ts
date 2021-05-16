import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { CommandHelper } from '../helper';
import validationMessageResources from '../resources';

interface IAuthorizeCommand{
  authorization: string;
}

export type AuthorizeData = {
  authorization: string;
  processID?: string;
};

export class AuthorizeCommand extends CommandHelper
  implements IAuthorizeCommand {
    #authorization: string;

    private constructor(data: IAuthorizeCommand, processID?: string) {
      super(processID);

      this.#authorization = data.authorization;
    }

    public get authorization() : string {
      return this.#authorization;
    }

    public static create(
      data: AuthorizeData,
      contractValidator: IContractValidator,
    ): AuthorizeCommand {
      const isValid = contractValidator
        .required({
          context: AuthorizeCommand.name,
          property: 'authorization',
          message: validationMessageResources.AUTHORIZATION_REQUIRED,
          value: data.authorization,
        })
        .isValid((t) => t === AuthorizeCommand.name);

      if (!isValid) {
        return null;
      }

      return new AuthorizeCommand({
        ...data,
      }, data.processID);
    }
}
