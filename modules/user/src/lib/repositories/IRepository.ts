import { User } from '@prisma/client';

export abstract class IRepository {
  public abstract findUserById(id:string): Promise<User | null>;
}
