import { UserStatus } from '@prisma/client';

export class UserEntity {
  constructor(
    public id: number,
    public fullName: string,
    public email: string,
    public verifyEmail: boolean,
    public status: UserStatus,
    public image:string | null,
    public lastLogin: Date | null,
    public createdAt: Date,
    public updatedAt: Date | null
  ) {}
}
