import { PrismaClient } from '@prisma/client';
import { IRepository } from './IRepository';
import { HandlerError } from '@backend-wallet/shared';
import { UserEntity } from '../entities/user.entity';

export class PrismaRepository implements IRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async findUserById(id: string): Promise<UserEntity | null> {
    try {
      const userDb = await this.prismaClient.user.findUnique({
        where: { id: id },
      });
      if (!userDb) {
        return null;
      }
      return UserEntity.toEntity(userDb);
    } catch {
      throw HandlerError.internalServer();
    }
  }
}
