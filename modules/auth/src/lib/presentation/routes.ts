import { Router } from 'express';
import { PrismaClientApp } from '@backend-wallet/prisma-client';
import { AuthController } from './controllers/auth.controller';
import { AuthDatasource, AuthRepository, EventBus } from '../infrastructure';
import { LastLoginHandler } from '../application';
import { UserLoggerEvent } from '../domain';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new AuthDatasource(PrismaClientApp.getInstance());
    const eventBus = new EventBus();
    const authRepository = new AuthRepository(dataSource);
    const authController = new AuthController(authRepository,eventBus);
    const lastLoginHandler = new LastLoginHandler(authRepository);

    eventBus.subscribe('UpdateLastLogin', (payload: UserLoggerEvent) => {
      lastLoginHandler.handler(payload);
    });

    router.post('/callback/google', authController.googleSignIn);
    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);
    router.post('/send-code', authController.sendCode);
    router.post('/verify-email', authController.verifyEmail);

    return router;
  }
}
