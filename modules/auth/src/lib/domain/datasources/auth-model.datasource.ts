import { RegisterUserDto } from '..';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasourceModel {
  public abstract register(registerDto: RegisterUserDto): Promise<UserEntity>;
}
