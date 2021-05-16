import { Request } from 'express';
import { AuthChecker } from 'type-graphql';

type Context = {
  req: Request
};

const authorizeMiddleware: AuthChecker = async ({ context }): Promise<boolean> => {
  const { req } = <Context>context;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const auth = <string>req.cookies.authorization
    ?? req.header('authorization');

  if (!auth) {
    return false;
  }

  return true;
};

export default authorizeMiddleware;
