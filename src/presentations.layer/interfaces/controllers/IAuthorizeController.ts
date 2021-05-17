import { BearerToken } from '@layer/presentations/requests/accessControl';
import { IdentityModel } from '@layer/presentations/responses/accessControl';
import { IController } from '../base';

export type IAuthorizeController = IController<BearerToken, IdentityModel | Error>;
