import { IObtainListOfRealEstateHandler } from '@layer/application/manageRealEstate/interfaces';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { internalServerError } from '../helper/Http';
import { IHttpRequest, IHttpResponse } from '../interfaces/base';
import { IObtainRealEstateController, types as handlerTypes } from '../interfaces/controllers';
import GetPage from '../viewModels/request';
import PagedDataModel from '../viewModels/response/common';
import { RealEstateModel } from '../viewModels/response/realEstate';

@injectable()
export default class ObtainRealEstateController implements IObtainRealEstateController {
  #handler: IObtainListOfRealEstateHandler;

  public constructor(
  @inject(handlerTypes.IObtainRealEstateController) handler: IObtainListOfRealEstateHandler,
  ) {
    this.#handler = handler;
  }

  public async handle(
    request: IHttpRequest<GetPage>,
  ): Promise<IHttpResponse<PagedDataModel<RealEstateModel>>> {
    try {
      const resultHandler = await this.#handler
        .execute(request.body);
    } catch (err) {
      return internalServerError(err);
    }
  }

  // public async handle(request: IHttpRequest<IGetCustomerList>): Promise<IHttpResponse<{ [P in keyof CustomerModel]: CustomerModel[P] }[]>> {
  //   try {
  //     const selector = request.body.responseSelector;

  //     request.body.responseSelector = map.selectorMapperCustomerModel
  //       .getDestinationMembers(Customer, selector);

  //     const tempCustomers = await this.handler.execute(request.body);

  //     const tempCustomersModel = tempCustomers
  //       ?.map((t) => map.modelViewMapper.map(t, new CustomerModel()));

  //     const result = tempCustomersModel
  //       ?.map((t) => map.selectorMapperCustomerModel.getSourceByDestinationSelector<CustomerModel>(t, selector));

  //     return ok(result);
  //   } catch (err) {
  //     return internalServerError(err.stack);
  //   }
  // }
}
