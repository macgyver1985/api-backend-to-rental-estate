import { BearerToken } from '@layer/presentations/requests/accessControl';
import { IController } from '../base';

export type IAuthorizeController = IController<BearerToken, boolean>;
