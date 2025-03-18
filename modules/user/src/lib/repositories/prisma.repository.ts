import { PrismaClient, User } from '@prisma/client';
import { IRepository } from './IRepository';
import { HandlerError } from '@backend-wallet/shared';

export class PrismaRepository implements IRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public findUserById(id: string): Promise<User | null> {
    try {
      return this.prismaClient.user.findUnique({ where: { id: id } });
    } catch {
      throw HandlerError.internalServer();
    }
  }
}
