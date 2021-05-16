import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthorizeCommand } from '..';
import { IAuthorizeHandler } from '../interfaces';

@injectable()
export default class AuthorizeHandler implements IAuthorizeHandler {
  #contractValidator: IContractValidator;

  public constructor(
  @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#contractValidator = contractValidator;
  }

  public async execute(command: AuthorizeCommand): Promise<TokenEntity> {
    const token = TokenEntity.validate(
      command.authorization,
      'askldfsjflasd',
      this.#contractValidator,
    );

    return Promise.resolve<TokenEntity>(token);
  }
}
