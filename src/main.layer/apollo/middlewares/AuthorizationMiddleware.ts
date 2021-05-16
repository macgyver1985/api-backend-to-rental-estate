import { Request, Response } from 'express';
import { MiddlewareFn } from 'type-graphql';
import TokenType from '../typeDefs/response/accessControl';

type Context = {
  req: Request,
  res: Response
};

const authorizationMiddleware: MiddlewareFn = async ({ context }, next): Promise<TokenType> => {
  const { res } = <Context>context;

  const result = <TokenType>(await next());

  res.cookie('authorization', result.authorization, {
    expires: new Date((new Date()).getTime() + 10000),
    path: '/',
    domain: 'localhost',
    httpOnly: false,
    secure: false,
    sameSite: 'strict',
  });

  return result;
};

export default authorizationMiddleware;
