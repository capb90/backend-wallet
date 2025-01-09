import { UserEntity } from "../../domain";

export interface IRegisterResponse{
    token:string;
    user:UserEntity
}