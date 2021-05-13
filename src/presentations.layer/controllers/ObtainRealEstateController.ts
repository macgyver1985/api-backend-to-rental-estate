import { IObtainListOfRealEstateHandler, types as handlerTypes } from '@layer/application/manageRealEstate/interfaces';
import { IContractValidator, types as fluentValidationTypes } from '@layer/crossCutting/fluentValidation/interfaces';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ObtainListOfRealEstateCommand } from '@layer/application/manageRealEstate';
import { RealEstateEntity } from '@layer/domain/realEstate';
import { ContractValidatorException } from '@layer/crossCutting/fluentValidation';
import { badRequest, internalServerError, ok } from '../helper/Http';
import { IHttpRequest, IHttpResponse } from '../interfaces/base';
import { IObtainRealEstateController } from '../interfaces/controllers';
import GetPage from '../viewModels/request';
import PagedDataModel from '../viewModels/response/common';
import { RealEstateModel } from '../viewModels/response/realEstate';
import autoMapper from '../helper/autoMapper';

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

      const listings: Array<RealEstateModel> = [];
      resultHandler.listings.forEach((t) => {
        const item = autoMapper.mapper<RealEstateEntity, RealEstateModel>(
          Symbol.for('RealEstateEntity'),
          Symbol.for('RealEstateModel'),
        ).map(t, {});

        listings.push(item);
      });

      const result: PagedDataModel<RealEstateModel> = {
        pageNumber: resultHandler.pageNumber,
        pageSize: resultHandler.pageSize,
        totalCount: resultHandler.totalCount,
        listings,
      };

      return ok(result);
    } catch (err) {
      if (err instanceof ContractValidatorException) {
        return badRequest<any>(err);
      }

      return internalServerError(err);
    }
  }
}
