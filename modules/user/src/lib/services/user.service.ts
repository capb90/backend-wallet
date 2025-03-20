import { IRepository } from '../repositories/IRepository';
import { JwtAdapter, verifyToken } from '@backend-wallet/auth';
import { HandlerError } from '@backend-wallet/shared';
import { UserEntity } from '../entities/user.entity';

export class UserService {
  constructor(
    private readonly repository: IRepository,
    private readonly verifyToken: verifyToken = JwtAdapter.validateToken
  ) {}

  public async detailByToken(token: string | null): Promise<UserEntity> {
    if (!token) {
      throw HandlerError.unauthorized('Usuario no autorizado');
    }

    const tokenBody = await this.verifyToken<{ id: string }>(token);

    if (!tokenBody) {
      throw HandlerError.internalServer('Error al verificar el token');
    }

    return await this.repository.findUserById(tokenBody.id);
  }
}
