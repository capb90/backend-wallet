import { UserStatus } from '@prisma/client';

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public verifyEmail: boolean,
    public emailVerified:Date | null,
    public status: UserStatus,
    public image:string | null,
    public lastLogin: Date | null,
    public createdAt: Date,
    public updatedAt: Date | null
  ) {}
}
