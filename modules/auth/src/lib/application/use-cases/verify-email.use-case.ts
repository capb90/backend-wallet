import {
  BaseUseCase,
  HandlerError,
  IApiResponse,
} from '@backend-wallet/shared';
import { AuthRepositoryModel, VerifyEmailDto } from '../../domain';
import { RedisClientApp } from '@backend-wallet/redis-client';

export class VerifyEmail implements BaseUseCase<VerifyEmailDto, IApiResponse> {
  constructor(private readonly authRepository: AuthRepositoryModel) {}

  public async execute(dataDto: VerifyEmailDto): Promise<IApiResponse> {
    const user = await this.authRepository.validationUserByEmail(dataDto.email);

    const codeCache = await RedisClientApp.get(
      'verification-email',
      user.email
    );

    if (!codeCache)
      throw HandlerError.notFound('Código no encontrado o expirado');

    if (codeCache !== dataDto.code)
      throw HandlerError.badRequest('Código incorrecto');

    await RedisClientApp.remove('verification-email', user.email);

    await this.authRepository.validationEmail(user.id);

    return {
      status: 'SUCCESS',
      message: 'Correo verificado exitosamente',
      statusCode: 200,
    };
  }
}
