import { envs } from '@backend-wallet/env';
import { PrismaClientApp } from '@backend-wallet/prisma-client';
import { HandlerError } from '@backend-wallet/shared';
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {
  LoginUser,
  RegisterUser,
  SendCode,
  VerifyEmail,
} from '../../application';
import { JwtAdapter } from '../../config';
import {
  AuthRepositoryModel,
  LoginUserDto,
  RegisterUserDto,
  VerifyEmailDto,
} from '../../domain';


const prisma = PrismaClientApp.getInstance();

const client = new OAuth2Client(envs.AUTH_GOOGLE_ID);


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

  public googleSignIn = async (req: Request, res: Response) => {
    const { credential } = req.body;


    if (!credential) {
      return res
        .status(400)
        .json(HandlerError.badRequest('Authorization code is required'));
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken:credential,
        audience:envs.AUTH_GOOGLE_ID
      })

      const payload = ticket.getPayload();

      if (!payload) {
        throw new Error('No se pudo obtener información del token');
      }


      let user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: payload.name,
            email: payload.email,
            authProvider:'GOOGLE',
            authProviderId:payload.sub
          },
        });
      }

      const token = await JwtAdapter.generateToken({ id: user.id });

      res.json({
        status: 'SUCCESS',
        message: 'Usuario validado correctamente',
        data: {
          token,
          user,
        },
        statusCode: 200,
      });
    } catch (error) {
      console.error(
        'Error during Google callback:',
        error.response?.data || error.message
      );

      res.status(500).json({ error: 'Failed to authenticate with Google' });
    }
  };
}
