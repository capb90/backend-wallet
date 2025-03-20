import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import {
  AuthRepositoryModel,
  LoginUserDto,
  UserLoggerEvent,
} from '../../domain';
import { JwtAdapter, SignToken } from '../../config';
import { ILoginResponse } from '../models/auth.interfaces';
import { EventBus } from '../../infrastructure';

export class LoginUser implements BaseUseCase<LoginUserDto, ILoginResponse> {
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly eventBus: EventBus,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  public async execute(dataDto: LoginUserDto): Promise<ILoginResponse> {
    const user = await this.authRepository.login(dataDto);

    const token = await this.signToken({ id: user.id });

    if (!token) throw HandlerError.internalServer('Error al generar el Token.');

    this.eventBus.publish({
      type: 'UpdateLastLogin',
      payload: new UserLoggerEvent(user.id, new Date()),
    });

    return {
      token,
      user,
    };
  }
}
