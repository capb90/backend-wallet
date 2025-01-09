import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepositoryModel {
  public abstract register(registerDto: RegisterUserDto): Promise<UserEntity>;
}
