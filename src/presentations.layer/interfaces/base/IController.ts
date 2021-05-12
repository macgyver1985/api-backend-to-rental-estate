import { IHttpRequest } from './IHttpRequest';
import { IHttpResponse } from './IHttpResponse';

export interface IController<Input, Output> {
  handle(request: IHttpRequest<Input>): Promise<IHttpResponse<Output>>
}
