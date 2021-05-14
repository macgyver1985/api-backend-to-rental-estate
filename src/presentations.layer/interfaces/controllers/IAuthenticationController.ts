import { GetAuthorization } from '@layer/presentations/viewModels/request';
import TokenModel from '@layer/presentations/viewModels/response/accessControl';
import { IController } from '../base';

export type IAuthenticationController = IController<GetAuthorization, TokenModel>;
