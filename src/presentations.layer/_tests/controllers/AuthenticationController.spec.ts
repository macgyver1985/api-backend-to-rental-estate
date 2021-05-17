import { JsonReadingRepository, UserRepository } from '@layer/adapters/repositories';
import { IReadingRepository } from '@layer/adapters/repositories/interfaces';
import { IUserRepository } from '@layer/application/interfaces/sockets/repositories';
import { AuthenticationHandler } from '@layer/application/useCase-authentication/handlers';
import { IAuthenticationHandler } from '@layer/application/useCase-authentication/interfaces';
import { ContractValidator } from '@layer/crossCutting/fluentValidation';
import { IContractValidator } from '@layer/crossCutting/fluentValidation/interfaces';
import { AuthenticationController } from '@layer/presentations/controllers';
import { IAuthenticationController } from '@layer/presentations/interfaces/controllers';
import { TokenModel } from '@layer/presentations/responses/accessControl';

describe('Test AuthenticationController', () => {
  const readingRepository: IReadingRepository = new JsonReadingRepository();
  const repository: IUserRepository = new UserRepository(readingRepository);
  const contractValidator: IContractValidator = new ContractValidator();
  const handler: IAuthenticationHandler = new AuthenticationHandler(
    repository,
    contractValidator,
  );
  const controller: IAuthenticationController = new AuthenticationController(
    handler,
    contractValidator,
  );

  it('Obbtem um token válido', async () => {
    const result = await controller
      .handle({
        body: {
          userName: 'zapuser',
          password: 'zappwd',
        },
      });

    expect(result).not.toBeNull();
    expect(result.statusCode).toEqual(200);
    expect(result.data).not.toBeNull();
    expect((result.data as TokenModel).authorization).not.toBeNull();
    expect((result.data as TokenModel).expiresIn).toEqual(60);
  });
});
