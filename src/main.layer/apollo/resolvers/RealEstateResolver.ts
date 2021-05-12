import container from '@layer/main/IoC';
import { IObtainRealEstateController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import EHttpStatusCode from '@layer/presentations/resources';
import { GraphQLResolveInfo } from 'graphql';
import 'reflect-metadata';
import {
  Arg, Info, Query, Resolver,
} from 'type-graphql';
import GetPageType from '../typeDefs/request';
import PagedDataType from '../typeDefs/response/common';
import { RealEstateType } from '../typeDefs/response/realEstate';

@Resolver(RealEstateType)
export default class RealEstateResolver {
  #obtainRealEstateController: IObtainRealEstateController;

  public constructor() {
    this.#obtainRealEstateController = container
      .get<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController);
  }

  @Query(() => PagedDataType, { nullable: true })
  public async getCustomersByQuery(
    @Info() info: GraphQLResolveInfo,
      @Arg('command') command: GetPageType,
  ): Promise<PagedDataType<RealEstateType>> {
    const result = await this.#obtainRealEstateController
      .handle({
        body: command,
      });

    if (result.statusCode !== EHttpStatusCode.OK) {
      throw new Error(<any>result.data);
    }

    return result.data;
  }
}
