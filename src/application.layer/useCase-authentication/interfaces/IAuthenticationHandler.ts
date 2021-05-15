import { IHandler } from '@layer/application/interfaces/base';
import { TokenEntity } from '@layer/domain/accessControl';
import { AuthenticationCommand } from '..';

export type IAuthenticationHandler = IHandler<AuthenticationCommand, TokenEntity>;
