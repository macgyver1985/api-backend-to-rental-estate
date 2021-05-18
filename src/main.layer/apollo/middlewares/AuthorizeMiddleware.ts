import container from '@layer/main/IoC';
import { IAuthorizeController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import EHttpStatusCode from '@layer/presentations/resources';
import { IdentityModel } from '@layer/presentations/responses/accessControl';
import { Request } from 'express';
import { AuthChecker } from 'type-graphql';

type Context = {
  req: Request;
  identity: string;
};

const authorizeMiddleware: AuthChecker = async ({ context }): Promise<boolean> => {
  const ctx = <Context>context;
  const { req } = <Context>context;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const auth = <string>req.cookies.authorization
    ?? req.header('authorization');

  if (!auth) {
    return false;
  }
  try {
    const controller = container
      .get<IAuthorizeController>(controllerTypes.IAuthorizeController);

    const response = await controller.handle({
      body: {
        authorization: auth.replace(/^(bearer )?/gmi, ''),
      },
    });

    if (response.statusCode !== EHttpStatusCode.OK) {
      return false;
    }

    ctx.identity = (response.data as IdentityModel).indentity;
  } catch (e) {
    return false;
  }

  return true;
};

export default authorizeMiddleware;
