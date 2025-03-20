import {
  BaseUseCase,
  HandlerError,
  IApiResponse,
} from '@backend-wallet/shared';
import { ILoginResponse, IUserToken } from '../models/auth.interfaces';
import { AuthRepositoryModel, UserLoggerEvent } from '../../domain';
import { envs } from '@backend-wallet/env';
import { JwtAdapter } from '../../config';
import { OAuth2Client } from 'google-auth-library';
import { EventBus } from '../../infrastructure';

type SignToken = (payload: object, duration?: string) => Promise<string | null>;

export class SignInGoogle implements BaseUseCase<string, IApiResponse<IUserToken>> {
  constructor(
    private readonly authRepository: AuthRepositoryModel,
    private readonly eventBus: EventBus,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private readonly clientOAuth: OAuth2Client = new OAuth2Client(
      envs.AUTH_GOOGLE_ID
    )
  ) {}

  public async execute(credential: string): Promise<IApiResponse<IUserToken>> {
    try {
      const ticket = await this.clientOAuth.verifyIdToken({
        idToken: credential,
        audience: envs.AUTH_GOOGLE_ID,
      });

      const payload = ticket.getPayload();

      if (!payload)
        throw HandlerError.notFound('No se pudo obtener información del token');

      const { user, action } = await this.authRepository.signInGoogle(payload);

      const token = await this.signToken({ id: user.id });

      if (!token)
        throw HandlerError.internalServer('Error al generar el Token.');

      this.eventBus.publish({
        type: 'UpdateLastLogin',
        payload: new UserLoggerEvent(user.id, new Date()),
      });

      return {
        status: 'SUCCESS',
        message: 'Usuario validado correctamente',
        data: {
          token,
          user,
        },
        statusCode: action === 'CREATE' ? 201 : 200,
      };
    } catch (error) {
      if (error instanceof HandlerError) {
        throw error;
      }
      throw HandlerError.badRequest(
        'Error al validar las credenciales de Google'
      );
    }
  }
}
