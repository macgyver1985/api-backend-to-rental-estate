import { IHandler } from '@layer/application/interfaces/base';
import { TokenEntity } from '@layer/domain/accessControl';
import { AuthorizeCommand } from '../AuthorizeCommand';

export type IAuthorizeHandler = IHandler<AuthorizeCommand, TokenEntity>;
