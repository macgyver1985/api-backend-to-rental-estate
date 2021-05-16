import container from '@layer/main/IoC';
import { IAuthorizeController, types as controllerTypes } from '@layer/presentations/interfaces/controllers';
import { Request } from 'express';
import { AuthChecker } from 'type-graphql';

type Context = {
  req: Request
};

const authorizeMiddleware: AuthChecker = async ({
  root, args, context, info,
}): Promise<boolean> => {
  const { req } = <Context>context;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const auth = <string>req.cookies.authorization
    ?? req.header('authorization');

  if (!auth) {
    return false;
  }

  const controller = container
    .get<IAuthorizeController>(controllerTypes.IAuthorizeController);

  const iden = await controller.handle({
    body: {
      authorization: auth,
    },
  });

  args.command.identity = iden.data.indentity;

  return true;
};

export default authorizeMiddleware;
