import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import { JwtAdapter } from '../../config';
import { AuthRepositoryModel, RegisterUserDto } from '../../domain';
import { IRegisterResponse } from '../models/register.interfaces';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class RegisterUser
  implements BaseUseCase<RegisterUserDto, IRegisterResponse>
{
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  public async execute(dataDto: RegisterUserDto): Promise<IRegisterResponse> {
    const user = await this.authRepository.register(dataDto);

    const token = await this.signToken({id:user.id});

    if(!token) throw HandlerError.internalServer('Error al generar el Token.');

    return {
      token,
      user,
    };
  }
}
