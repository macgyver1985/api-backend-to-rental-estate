import { IHandler } from '@layer/application/interfaces/base';
import { UserEntity } from '@layer/domain/accessControl';
import { AuthenticationCommand } from '..';

export type IAuthenticationHandler = IHandler<AuthenticationCommand, UserEntity>;
