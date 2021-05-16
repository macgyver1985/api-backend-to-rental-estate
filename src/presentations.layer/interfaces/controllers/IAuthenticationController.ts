import { GetAuthorization } from '@layer/presentations/requests/accessControl';
import { TokenModel } from '@layer/presentations/responses/accessControl';
import { IController } from '../base';

export type IAuthenticationController = IController<GetAuthorization, TokenModel>;
