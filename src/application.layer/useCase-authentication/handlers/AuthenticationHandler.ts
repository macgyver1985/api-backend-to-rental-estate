import { autoMapper } from '@layer/application/helper';
import { IUserRepository, types as repositoriesTypes } from '@layer/application/interfaces/sockets/repositories';
import UserDTO from '@layer/application/models/accessControl';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity, UserData, UserEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { AuthenticationCommand } from '..';
import { IAuthenticationHandler } from '../interfaces';

@injectable()
export default class AuthenticationHandler implements IAuthenticationHandler {
  #contractValidator: IContractValidator;

  #userRepository: IUserRepository;

  public constructor(
  @inject(repositoriesTypes.IPartnerRepository) userRepository: IUserRepository,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#contractValidator = contractValidator;
    this.#userRepository = userRepository;
  }

  public async execute(command: AuthenticationCommand): Promise<TokenEntity> {
    const userRepo = await this.#userRepository
      .findSpecific((t) => t.userName === command.userName
        && t.password === command.password);

    if (!userRepo) {
      return null;
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
      .setExpiresIn(60);

    return token;
  }
}
