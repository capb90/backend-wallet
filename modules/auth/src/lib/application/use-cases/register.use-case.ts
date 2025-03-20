import { BaseUseCase } from '@backend-wallet/shared';
import { AuthRepositoryModel, RegisterUserDto } from '../../domain';
import { IRegisterResponse } from '../models/auth.interfaces';

export class RegisterUser
  implements BaseUseCase<RegisterUserDto, IRegisterResponse>
{
  constructor(private readonly authRepository: AuthRepositoryModel) {}

  public async execute(dataDto: RegisterUserDto): Promise<IRegisterResponse> {
    return await this.authRepository.register(dataDto);
  }
}
