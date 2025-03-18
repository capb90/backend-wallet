import { UserStatus } from '@prisma/client';

export class AuthEntity {
  constructor(
    public id: string,
    public name: string,
    public status: UserStatus,
    public email:string,
    public verifyEmail: boolean
  ) {}
}
