import { TokenPayload } from 'google-auth-library';
import { LoginUserDto } from '../dtos/login-user.dto';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthEntity } from '../entities/auth.entity';

export abstract class AuthRepositoryModel {
  public abstract register(registerDto: RegisterUserDto): Promise<AuthEntity>;
  public abstract login(loginDto: LoginUserDto): Promise<AuthEntity>;
  public abstract validationUserByEmail(email: string): Promise<AuthEntity>;
  public abstract validationEmail(userId: string): Promise<void>;
  public abstract signInGoogle(payload: TokenPayload): Promise<{user:AuthEntity; action:'CREATE' | 'UPDATE'}>;
  public abstract updateLastLogin(
    lastLogin: Date,
    userId: string
  ): Promise<void>;
}
