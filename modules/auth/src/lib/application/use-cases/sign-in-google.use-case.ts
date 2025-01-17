import { BaseUseCase, HandlerError } from '@backend-wallet/shared';
import { ILoginResponse } from '../models/auth.interfaces';
import { AuthRepositoryModel } from '../../domain';
import { envs } from '@backend-wallet/env';
import { JwtAdapter } from '../../config';
import { OAuth2Client } from 'google-auth-library';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class SignInGoogle implements BaseUseCase<string, ILoginResponse> {
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private readonly clientOAuth: OAuth2Client = new OAuth2Client(
      envs.AUTH_GOOGLE_ID
    )
  ) {}

  public async execute(credential: string): Promise<ILoginResponse> {
    const ticket = await this.clientOAuth.verifyIdToken({
      idToken: credential,
      audience: envs.AUTH_GOOGLE_ID,
    });

    const payload = ticket.getPayload();
    
    if (!payload)
      throw HandlerError.notFound('No se pudo obtener información del token');

    const user = await this.authRepository.signInGoogle(payload);

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
