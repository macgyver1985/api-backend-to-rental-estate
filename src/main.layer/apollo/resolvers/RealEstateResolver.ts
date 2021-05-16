import container from '@layer/main/IoC';
import { IAuthorizeController, IObtainRealEstateController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import EHttpStatusCode from '@layer/presentations/resources';
import { Request } from 'express';
import 'reflect-metadata';
import {
  Arg, Authorized, Ctx, Info, Query, Resolver,
} from 'type-graphql';
import GetPageType from '../typeDefs/request/common';
import PagedRealEstateType from '../typeDefs/response/paged';
import { RealEstateType } from '../typeDefs/response/realEstate';

type Context = {
  req: Request
};

@Resolver(RealEstateType)
export default class RealEstateResolver {
  #obtainRealEstateController: IObtainRealEstateController;

  #authorizeController: IAuthorizeController;

  public constructor() {
    this.#obtainRealEstateController = container
      .get<IObtainRealEstateController>(controllerTypes.IObtainRealEstateController);
    this.#authorizeController = container
      .get<IAuthorizeController>(controllerTypes.IAuthorizeController);
  }

  @Authorized()
  @Query(() => PagedRealEstateType, { nullable: true })
  public async obtainRealEstate(
    @Arg('command') command: GetPageType,
      @Ctx() context: Context,
  ): Promise<PagedRealEstateType> {
    const { req } = context;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const auth = <string>req.cookies.authorization
      ?? req.header('authorization');

    const iden = await this.#authorizeController.handle({
      body: {
        authorization: auth,
      },
    });

    command.identity = iden.data.indentity;

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
