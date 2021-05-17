import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAppSettings, types as settingsTypes } from '@layer/crossCutting/appSettings/interfaces';
import ISettings from '@layer/settings/interfaces';
import { AuthorizeCommand } from '..';
import { IAuthorizeHandler } from '../interfaces';

@injectable()
export default class AuthorizeHandler implements IAuthorizeHandler {
  #contractValidator: IContractValidator;

  #secretKey: string;

  public constructor(
  @inject(settingsTypes.IAppSettings) settings: IAppSettings<ISettings>,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.#secretKey = settings.configs().application.useCase.authentication.secretkey;
    this.#contractValidator = contractValidator;
  }

  public async execute(command: AuthorizeCommand): Promise<TokenEntity> {
    const token = TokenEntity.validate(
      command.authorization,
      this.#secretKey,
      this.#contractValidator,
    );

    return Promise.resolve<TokenEntity>(token);
  }
}
