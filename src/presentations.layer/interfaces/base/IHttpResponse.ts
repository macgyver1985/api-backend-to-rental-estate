import EHttpStatusCode from '@layer/presentations/resources';

export interface IHttpResponse<T>{
  statusCode: EHttpStatusCode
  statusMessage: string
  data: T
}
