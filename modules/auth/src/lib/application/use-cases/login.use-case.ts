import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import { AuthRepositoryModel, LoginUserDto } from '../../domain';
import { JwtAdapter } from '../../config';
import { ILoginResponse } from '../models/auth.interfaces';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class LoginUser implements BaseUseCase<LoginUserDto, ILoginResponse> {
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  public async execute(dataDto: LoginUserDto): Promise<ILoginResponse> {
    const user = await this.authRepository.login(dataDto);

    const token = await this.signToken({ id: user.id });

    if (!token) throw HandlerError.internalServer('Error al generar el Token.');

    this.authRepository.updateLastLogin(new Date(), user.id);

    return {
      status: 'SUCCESS',
      message: 'Usuario validado correctamente',
      data: {
        token,
        user,
      },
      statusCode: 200,
    };
  }
}
