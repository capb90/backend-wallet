import { AuthEntity } from '../../domain';

export interface IUserToken {
  token: string;
  user: AuthEntity;
}

export type IRegisterResponse = AuthEntity;
export type ILoginResponse = IUserToken;
