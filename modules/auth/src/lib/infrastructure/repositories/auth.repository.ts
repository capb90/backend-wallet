import {
  AuthDatasourceModel,
  AuthRepositoryModel,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';

export class AuthRepository implements AuthRepositoryModel {
  constructor(private readonly authDataSource: AuthDatasourceModel) {}

  public validationEmail(userId: string): Promise<void> {
    return this.authDataSource.validationEmail(userId);
  }

  public validationUserByEmail(email: string): Promise<UserEntity> {
    return this.authDataSource.validationUserByEmail(email);
  }

  public register(registerDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerDto);
  }

  public login(loginDto: LoginUserDto): Promise<UserEntity> {
    return this.authDataSource.login(loginDto);
  }

  public updateLastLogin(lastLogin: Date, userId: string): Promise<void> {
    return this.authDataSource.updateLastLogin(lastLogin, userId);
  }
}
