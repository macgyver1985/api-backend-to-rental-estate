import { BearerToken } from '@layer/presentations/viewModels/request';
import { IController } from '../base';

export type IAuthorizeController = IController<BearerToken, boolean>;
