import {
  AuthDatasourceModel,
  AuthRepositoryModel,
  RegisterUserDto,
  UserEntity
} from '../../domain';

export class AuthRepository implements AuthRepositoryModel {
  constructor(private readonly authDataSource: AuthDatasourceModel) {}

  public register(registerDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerDto);
  }
}
