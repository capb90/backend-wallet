import { IRepository } from '../repositories/IRepository';
import { JwtAdapter, verifyToken } from '@backend-wallet/auth';
import { HandlerError } from '@backend-wallet/shared';
import { UserEntity } from '../entities/user.entity';

export class UserService {
  constructor(
    private readonly repository: IRepository,
    private readonly verifyToken: verifyToken = JwtAdapter.validateToken
  ) {}

  public async detailByToken(authorization: string | null): Promise<UserEntity> {
    const token = authorization.split(' ')[1];
    if (!token) {
      throw HandlerError.unauthorized('Usuario no autorizado');
    }

    const tokenBody = await this.verifyToken<{ id: string }>(token);

    if (!tokenBody) {
      throw HandlerError.badRequest('Error al verificar el token');
    }

    return await this.repository.findUserById(tokenBody.id);
  }
}
