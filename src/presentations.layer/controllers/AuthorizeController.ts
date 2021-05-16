import { AuthorizeCommand } from '@layer/application/useCase-authentication';
import { IAuthorizeHandler, types as handlerTypes } from '@layer/application/useCase-authentication/interfaces';
import { ContractValidatorException } from '@layer/crossCutting/fluentValidation';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { TokenEntity } from '@layer/domain/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import autoMapper from '../helper/autoMapper';
import { badRequest, internalServerError, ok } from '../helper/Http';
import { IHttpRequest, IHttpResponse } from '../interfaces/base';
import { IAuthorizeController } from '../interfaces/controllers';
import { BearerToken } from '../requests/accessControl';
import { IdentityModel } from '../responses/accessControl';

@injectable()
export default class AuthorizeController implements IAuthorizeController {
  #handler: IAuthorizeHandler;

  #contractValidator: IContractValidator;

  public constructor(
  @inject(handlerTypes.IAuthorizeHandler) handler: IAuthorizeHandler,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#handler = handler;
    this.#contractValidator = contractValidator;
  }

  public async handle(
    request: IHttpRequest<BearerToken>,
  ): Promise<IHttpResponse<IdentityModel>> {
    try {
      const command = AuthorizeCommand.create({
        authorization: request.body.authorization,
      }, this.#contractValidator);

      this.#contractValidator
        .throwException('presentations', (t) => t === AuthorizeCommand.name);

      const resultHandler = await this.#handler
        .execute(command);

      const result = autoMapper
        .mapper<TokenEntity, IdentityModel>(
        Symbol.for('TokenEntity'),
        Symbol.for('IdentityModel'),
      ).map(resultHandler, <IdentityModel>{});

      return ok(result);
    } catch (err) {
      if (err instanceof ContractValidatorException) {
        return badRequest<any>(err);
      }

      return internalServerError(err);
    }
  }
}
