import {
  BaseUseCase,
  generateVerificationCode,
  IApiResponse,
} from '@backend-wallet/shared';
import { RedisClientApp } from '@backend-wallet/redis-client';
import { AuthRepositoryModel } from '../../domain';
import transporterEmail from '../../config/send-email';

export class SendCode implements BaseUseCase<string, IApiResponse> {
  constructor(private readonly authRepository: AuthRepositoryModel) {}

  public async execute(email: string): Promise<IApiResponse> {
    const user = await this.authRepository.validationUserByEmail(email);

    const code = generateVerificationCode();
    const expiresIn = 15 * 60;

    await RedisClientApp.client.setEx(
      `verification-${user.id}:${user.email}`,
      expiresIn,
      code
    );

    await transporterEmail.sendMail({
      to: user.email,
      subject: 'Verificación de correo electrónico',
      html: `<p>Tu código de verificación es: <strong>${code}</strong></p>`,
    });

    return {
      status: 'SUCCESS',
      message: `Se ha enviado el código de verificación al correo ${email}`,
      statusCode: 200,
    };
  }
}
