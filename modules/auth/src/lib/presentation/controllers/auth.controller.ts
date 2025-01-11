import { HandlerError } from '@backend-wallet/shared';
import { Request, Response } from 'express';
import {
  LoginUser,
  RegisterUser,
  SendCode,
  VerifyEmail,
} from '../../application';
import {
  AuthRepositoryModel,
  LoginUserDto,
  RegisterUserDto,
  VerifyEmailDto,
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
      .then((data) => res.status(data.statusCode).json(data))
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

  public sendCode = (req: Request, res: Response) => {
    const { email } = req.body;

    new SendCode(this.authRepository)
      .execute(email)
      .then((data) => res.status(201).json(data))
      .catch((error) => this.handlerErrors(error, res));
  };

  public verifyEmail = (req: Request, res: Response) => {
    const [error, verifyEmailDto] = VerifyEmailDto.create(req.body);

    if (error) return res.status(error.code).json(error);

    new VerifyEmail(this.authRepository)
      .execute(verifyEmailDto)
      .then((data) => res.json(data))
      .catch((error) => this.handlerErrors(error, res));
  };
}
