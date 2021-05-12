import { IHttpResponse } from '../interfaces/base';
import EHttpStatusCode from '../resources';

export const ok = <T>(data: T): IHttpResponse<T> => ({
  statusCode: EHttpStatusCode.OK,
  statusMessage: 'OK',
  data,
});

export const badRequest = <T>(data: T): IHttpResponse<T> => ({
  statusCode: EHttpStatusCode.BadRequest,
  statusMessage: 'Bad request',
  data,
});

export const internalServerError = <T>(data: T): IHttpResponse<T> => ({
  statusCode: EHttpStatusCode.InternalServerError,
  statusMessage: 'Internal server error',
  data,
});
