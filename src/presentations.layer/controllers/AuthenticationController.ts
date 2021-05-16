import { AuthenticationCommand } from '@layer/application/useCase-authentication';
import { IAuthenticationHandler, types as handlerTypes } from '@layer/application/useCase-authentication/interfaces';
import { ContractValidatorException } from '@layer/crossCutting/fluentValidation';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import autoMapper from '../helper/autoMapper';
import { badRequest, internalServerError, ok } from '../helper/Http';
import { IHttpRequest, IHttpResponse } from '../interfaces/base';
import { IAuthenticationController } from '../interfaces/controllers';
import { GetAuthorization } from '../requests/accessControl';
import TokenModel from '../responses/accessControl';

@injectable()
export default class AuthenticationController implements IAuthenticationController {
  #handler: IAuthenticationHandler;

  #contractValidator: IContractValidator;

  public constructor(
  @inject(handlerTypes.IAuthenticationHandler) handler: IAuthenticationHandler,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#handler = handler;
    this.#contractValidator = contractValidator;
  }

  public async handle(
    request: IHttpRequest<GetAuthorization>,
  ): Promise<IHttpResponse<TokenModel>> {
    try {
      const command = AuthenticationCommand.create({
        userName: request.body.userName,
        password: request.body.password,
      }, this.#contractValidator);

      this.#contractValidator
        .throwException('presentations', (t) => t === AuthenticationCommand.name);

      const resultHandler = await this.#handler
        .execute(command);

      const result = autoMapper
        .mapper<TokenEntity, TokenModel>(
        Symbol.for('TokenEntity'),
        Symbol.for('TokenModel'),
      ).map(resultHandler, <TokenModel>{});

      return ok(result);
    } catch (err) {
      if (err instanceof ContractValidatorException) {
        return badRequest<any>(err);
      }

      return internalServerError(err);
    }
  }
}
