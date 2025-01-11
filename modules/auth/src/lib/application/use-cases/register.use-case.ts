import { BaseUseCase } from '@backend-wallet/shared';
import { AuthRepositoryModel, RegisterUserDto } from '../../domain';
import { IRegisterResponse } from '../models/auth.interfaces';

export class RegisterUser
  implements BaseUseCase<RegisterUserDto, IRegisterResponse>
{
  constructor(private readonly authRepository: AuthRepositoryModel) {}

  public async execute(dataDto: RegisterUserDto): Promise<IRegisterResponse> {
    const user = await this.authRepository.register(dataDto);

    return {
      status: 'SUCCESS',
      message: 'El usuario se registró exitosamente',
      data: user,
      statusCode: 201,
    };
  }
}
