import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import { AuthRepositoryModel, LoginUserDto } from '../../domain';
import { IApiAuthResponse } from '../models/auth.interfaces';
import { JwtAdapter } from '../../config';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class LoginUser implements BaseUseCase<LoginUserDto, IApiAuthResponse> {
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  public async execute(dataDto: LoginUserDto): Promise<IApiAuthResponse> {
    const user = await this.authRepository.login(dataDto);

    const token = await this.signToken({ id: user.id });

    if (!token) throw HandlerError.internalServer('Error al generar el Token.');
    
    this.authRepository.updateLastLogin(new Date(),user.id);
    
    return {
      token,
      user,
    };
  }
}
      