import { UserEntity } from '../../domain';
import { IApiResponse } from '@backend-wallet/shared';

export interface IUserToken {
  token: string;
  user: UserEntity;
}

export type IRegisterResponse = IApiResponse<UserEntity>;
export type ILoginResponse = IApiResponse<IUserToken>;
