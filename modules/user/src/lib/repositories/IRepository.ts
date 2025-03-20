import { UserEntity } from '../entities/user.entity';

export abstract class IRepository {
  public abstract findUserById(id: string): Promise<UserEntity | null>;
}
