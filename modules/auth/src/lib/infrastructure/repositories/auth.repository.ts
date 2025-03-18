import { TokenPayload } from 'google-auth-library';
import {
  AuthDatasourceModel,
  AuthRepositoryModel,
  LoginUserDto,
  RegisterUserDto,
  AuthEntity,
} from '../../domain';

export class AuthRepository implements AuthRepositoryModel {
  constructor(private readonly authDataSource: AuthDatasourceModel) {}

  public signInGoogle(payload: TokenPayload): Promise<{user:AuthEntity; action:'CREATE' | 'UPDATE'}> {
    return this.authDataSource.signInGoogle(payload);
  }

  public validationEmail(userId: string): Promise<void> {
    return this.authDataSource.validationEmail(userId);
  }

  public validationUserByEmail(email: string): Promise<AuthEntity> {
    return this.authDataSource.validationUserByEmail(email);
  }

  public register(registerDto: RegisterUserDto): Promise<AuthEntity> {
    return this.authDataSource.register(registerDto);
  }

  public login(loginDto: LoginUserDto): Promise<AuthEntity> {
    return this.authDataSource.login(loginDto);
  }

  public updateLastLogin(lastLogin: Date, userId: string): Promise<void> {
    return this.authDataSource.updateLastLogin(lastLogin, userId);
  }
}
