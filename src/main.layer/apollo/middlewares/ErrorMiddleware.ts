import { IHttpResponse } from '@layer/presentations/interfaces/base';
import { MiddlewareFn } from 'type-graphql';

const errorMiddleware: MiddlewareFn<any> = async (_, next): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const result = <IHttpResponse<any>>(await next({ args: { identity: 'teste' } }));

    return result;
  } catch (err) {
    throw err;
  }
};

export default errorMiddleware;
