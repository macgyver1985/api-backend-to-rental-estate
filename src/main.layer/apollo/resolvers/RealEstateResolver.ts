import container from '@layer/main/IoC';
import { IObtainRealEstateController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import EHttpStatusCode from '@layer/presentations/resources';
import 'reflect-metadata';
import {
  Arg, Authorized, Query, Resolver,
} from 'type-graphql';
import GetPageType from '../typeDefs/request/common';
import PagedRealEstateType from '../typeDefs/response/paged';
import { RealEstateType } from '../typeDefs/response/realEstate';

@Resolver(RealEstateType)
export default class RealEstateResolver {
  #obtainRealEstateController: IObtainRealEstateController;

  public constructor() {
    this.#obtainRealEstateController = container
      .get<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController);
  }

  @Authorized()
  @Query(() => PagedRealEstateType, { nullable: true })
  public async obtainRealEstate(
    @Arg('command') command: GetPageType,
  ): Promise<PagedRealEstateType> {
    const result = await this.#obtainRealEstateController
      .handle({
        body: command,
      });

    if (result.statusCode !== EHttpStatusCode.OK) {
      throw new Error(JSON.stringify({
        statusCode: result.statusCode,
        message: (<Error>result.data).message,
      }));
    }

    return result.data;
  }
}
