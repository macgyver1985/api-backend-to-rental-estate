import { autoMapper } from '@layer/application/helper';
import { IUserRepository, types as repositoriesTypes } from '@layer/application/interfaces/sockets/repositories';
import UserDTO from '@layer/application/models/accessControl';
import validationMessageResources from '@layer/application/resources';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity, UserData, UserEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IAppSettings, types as settingsTypes } from '@layer/crossCutting/appSettings/interfaces';
import ISettings from '@layer/settings/interfaces';
import { AuthenticationCommand } from '..';
import { IAuthenticationHandler } from '../interfaces';

@injectable()
export default class AuthenticationHandler implements IAuthenticationHandler {
  #contractValidator: IContractValidator;

  #userRepository: IUserRepository;

  #secretKey: string;

  #expiresIn: number;

  public constructor(
  @inject(settingsTypes.IAppSettings) settings: IAppSettings<ISettings>,
    @inject(repositoriesTypes.IUserRepository) userRepository: IUserRepository,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.#secretKey = settings.configs().application.useCase.authentication.secretkey;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.#expiresIn = settings.configs().application.useCase.authentication.expiresIn;
    this.#contractValidator = contractValidator;
    this.#userRepository = userRepository;
  }

  public async execute(command: AuthenticationCommand): Promise<TokenEntity> {
    const userRepo = await this.#userRepository
      .findSpecific((t) => t.userName === command.userName
        && t.password === command.password);

    if (!userRepo) {
      this.#contractValidator
        .addNotification({
          context: AuthenticationHandler.name,
          property: 'userName and password',
          message: validationMessageResources.USER_NOT_FOUND,
        })
        .throwException('application');
    }

    const data = autoMapper.mapper<UserDTO, UserData>(
      Symbol.for('UserDTO'),
      Symbol.for('UserData'),
    )
      .map(userRepo, <UserData>{});

    const user = UserEntity.create(data, this.#contractValidator);
    const token = TokenEntity.create(
      user.partnerId,
      this.#contractValidator,
    )
      .addClaim({
        userName: user.userName,
        userId: user.id,
      })
      .setExpiresIn(this.#expiresIn)
      .authorizationBuilder(this.#secretKey);

    return token;
  }
}
