import container from '@layer/main/IoC';
import { IAuthenticationController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import EHttpStatusCode from '@layer/presentations/resources';
import 'reflect-metadata';
import {
  Arg, Mutation, Resolver, UseMiddleware,
} from 'type-graphql';
import authorizationMiddleware from '../middlewares/AuthorizationMiddleware';
import GetAuthorizationType from '../typeDefs/request/accessControl';
import TokenType from '../typeDefs/response/accessControl';

@Resolver()
export default class TokenResolver {
  #authenticationController: IAuthenticationController;

  public constructor() {
    this.#authenticationController = container
      .get<IAuthenticationController>(controllerTypes.IAuthenticationController);
  }

  @Mutation(() => TokenType, { nullable: true })
  @UseMiddleware(authorizationMiddleware)
  public async GetAuthorization(
    @Arg('command') command: GetAuthorizationType,
  ): Promise<TokenType> {
    const result = await this.#authenticationController
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
