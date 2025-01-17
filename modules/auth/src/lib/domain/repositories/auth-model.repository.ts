import { TokenPayload } from 'google-auth-library';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepositoryModel {
  public abstract register(registerDto: RegisterUserDto): Promise<UserEntity>;
  public abstract login(loginDto: LoginUserDto): Promise<UserEntity>;
  public abstract validationUserByEmail(email: string): Promise<UserEntity>;
  public abstract validationEmail(userId: string): Promise<void>;
  public abstract signInGoogle(payload: TokenPayload): Promise<UserEntity>;
  public abstract updateLastLogin(
    lastLogin: Date,
    userId: string
  ): Promise<void>;
}
