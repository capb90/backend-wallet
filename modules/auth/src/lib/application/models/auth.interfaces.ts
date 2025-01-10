import { UserEntity } from "../../domain";

export interface IApiAuthResponse {
  token: string;
  user: UserEntity;
}
