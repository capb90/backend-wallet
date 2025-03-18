import { AuthEntity } from '../../domain';
import { IApiResponse } from '@backend-wallet/shared';

export interface IUserToken {
  token: string;
  user: AuthEntity;
}

export type IRegisterResponse = IApiResponse<AuthEntity>;
export type ILoginResponse = IApiResponse<IUserToken>;
