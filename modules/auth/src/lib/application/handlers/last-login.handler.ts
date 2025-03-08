import { AuthRepositoryModel, UserLoggerEvent } from '../../domain';

export class LastLoginHandler {
  constructor( private readonly authRepository: AuthRepositoryModel) {}

  public async handler(event:UserLoggerEvent): Promise<void> {
    await this.authRepository.updateLastLogin(event.lastLogin,event.userID)
  }
}