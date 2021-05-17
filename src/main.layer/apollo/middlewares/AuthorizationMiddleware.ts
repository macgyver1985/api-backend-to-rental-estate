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
    expires: new Date((new Date()).getTime() + (result.expiresIn * 60000)),
    path: '/',
    domain: 'localhost',
    httpOnly: false,
    secure: false,
  });

  return result;
};

export default authorizationMiddleware;
