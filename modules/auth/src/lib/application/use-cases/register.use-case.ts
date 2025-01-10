import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import { JwtAdapter } from '../../config';
import { AuthRepositoryModel, RegisterUserDto } from '../../domain';
import { IApiAuthResponse } from '../models/auth.interfaces';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class RegisterUser
  implements BaseUseCase<RegisterUserDto, IApiAuthResponse>
{
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  public async execute(dataDto: RegisterUserDto): Promise<IApiAuthResponse> {
    const user = await this.authRepository.register(dataDto);

    const token = await this.signToken({id:user.id});

    if(!token) throw HandlerError.internalServer('Error al generar el Token.');

    this.authRepository.updateLastLogin(new Date(),user.id);

    return {
      token,
      user,
    };
  }
}
