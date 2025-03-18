import { TokenPayload } from 'google-auth-library';
import { LoginUserDto, RegisterUserDto } from '..';
import { AuthEntity } from '../entities/auth.entity';

export abstract class AuthDatasourceModel {
  public abstract register(registerDto: RegisterUserDto): Promise<AuthEntity>;
  public abstract login(registerDto: LoginUserDto): Promise<AuthEntity>;
  public abstract validationUserByEmail(email: string): Promise<AuthEntity>;
  public abstract validationEmail(userId: string): Promise<void>;
  public abstract signInGoogle(payload: TokenPayload): Promise<{user:AuthEntity; action:'CREATE' | 'UPDATE'}>;
  public abstract updateLastLogin(
    lastLogin: Date,
    userId: string
  ): Promise<void>;
}
