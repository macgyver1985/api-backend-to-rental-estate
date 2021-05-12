import EHttpStatusCode from 'src/presentations.layer/resources';

export interface IHttpResponse<T>{
  statusCode: EHttpStatusCode
  statusMessage: string
  data: T
}
