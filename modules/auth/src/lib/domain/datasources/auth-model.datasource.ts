import { LoginUserDto, RegisterUserDto } from '..';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasourceModel {
  public abstract register(registerDto: RegisterUserDto): Promise<UserEntity>;
  public abstract login(registerDto: LoginUserDto): Promise<UserEntity>;
  public abstract validationUserByEmail(email: string): Promise<UserEntity>;
  public abstract updateLastLogin(
    lastLogin: Date,
    userId: number
  ): Promise<void>;
}
