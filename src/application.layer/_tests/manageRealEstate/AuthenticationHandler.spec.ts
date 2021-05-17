import { IUserRepository } from '@layer/application/interfaces/sockets/repositories';
import { AuthenticationCommand } from '@layer/application/useCase-authentication';
import { AuthenticationHandler } from '@layer/application/useCase-authentication/handlers';
import { IAuthenticationHandler } from '@layer/application/useCase-authentication/interfaces';
import AppSettings from '@layer/crossCutting/appSettings';
import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import ISettings from '@layer/settings/interfaces';
import UserRepositoryMock from '../__manual-mock__/UserRepositoryMock';

describe('Test AuthenticationHandler', () => {
  const settings = AppSettings.create<ISettings>(`${__dirname}/../../../settings.layer`);
  const userRepository: IUserRepository = UserRepositoryMock();
  const contractValidator = new ContractValidator();
  const handler: IAuthenticationHandler = new AuthenticationHandler(
    settings,
    userRepository,
    contractValidator,
  );

  it('Retorna um token de acesso válido.', async () => {
    const command = AuthenticationCommand.create({
      userName: 'zapuser',
      password: 'zappwd',
    }, contractValidator);

    const result = await handler.execute(command);

    expect(result.authorization).not.toBeNull();
  });
});
