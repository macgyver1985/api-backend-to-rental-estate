import { ObtainListOfRealEstateCommand } from '@layer/application/useCase-manageRealEstate';
import { IObtainListOfRealEstateHandler, types as handlerTypes } from '@layer/application/useCase-manageRealEstate/interfaces';
import { ContractValidatorException } from '@layer/crossCutting/fluentValidation';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { PagedDataVO } from '@layer/domain/common';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import autoMapper from '../helper/autoMapper';
import { badRequest, internalServerError, ok } from '../helper/Http';
import { IHttpRequest, IHttpResponse } from '../interfaces/base';
import { IObtainRealEstateController } from '../interfaces/controllers';
import GetPage from '../requests/common';
import PagedDataModel from '../responses/common';
import { RealEstateModel } from '../responses/realEstate';

@injectable()
export default class ObtainRealEstateController implements IObtainRealEstateController {
  #handler: IObtainListOfRealEstateHandler;

  #contractValidator: IContractValidator;

  public constructor(
  @inject(handlerTypes.IObtainListOfRealEstateHandler) handler: IObtainListOfRealEstateHandler,
    @inject(fluentValidationTypes.IContractValidator) contractValidator: IContractValidator,
  ) {
    this.#handler = handler;
    this.#contractValidator = contractValidator;
  }

  public async handle(
    request: IHttpRequest<GetPage>,
  ): Promise<IHttpResponse<PagedDataModel<RealEstateModel>>> {
    try {
      const command = ObtainListOfRealEstateCommand.create({
        pageNumber: request.body.pageNumber,
        pageSize: request.body.pageSize,
        partnerID: '4097a93d-dcf3-4e83-b3b8-729527fb2767',
      }, this.#contractValidator);

      this.#contractValidator
        .throwException('presentations', (t) => t === ObtainListOfRealEstateCommand.name);

      const resultHandler = await this.#handler
        .execute(command);

      const result = autoMapper
        .mapper<PagedDataVO<RealEstateEntity>, PagedDataModel<RealEstateModel>>(
        Symbol.for('PagedDataVO<RealEstateEntity>'),
        Symbol.for('PagedDataModel<RealEstateModel>'),
      ).map(resultHandler, {});

      return ok(result);
    } catch (err) {
      if (err instanceof ContractValidatorException) {
        return badRequest<any>(err);
      }

      return internalServerError(err);
    }
  }
}
