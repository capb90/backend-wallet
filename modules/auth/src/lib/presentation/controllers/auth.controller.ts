import { HandlerError } from '@backend-wallet/shared';
import { Request, Response } from 'express';
import { LoginUser, RegisterUser } from '../../application';
import {
  AuthRepositoryModel,
  LoginUserDto,
  RegisterUserDto,
} from '../../domain';

export class AuthController {
  constructor(private readonly authRepository: AuthRepositoryModel) {}

  private handlerErrors(error: unknown, res: Response) {
    if (error instanceof HandlerError) {
      return res.status(error.code).json(error);
    }

    const errorServer = HandlerError.internalServer();
    return res.status(errorServer.code).json(errorServer);
  }

  public registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(error.code).json(error);

    new RegisterUser(this.authRepository)
      .execute(registerUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerErrors(error, res));
  };

  public loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(error.code).json(error);

    new LoginUser(this.authRepository)
      .execute(loginUserDto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerErrors(error, res));
  };
}
