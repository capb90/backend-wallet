import { Router } from 'express';
import { PrismaClientApp } from '@backend-wallet/prisma-client';
import { AuthController } from './controllers/auth.controller';
import { AuthDatasource, AuthRepository } from '../infrastructure';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const dataSource = new AuthDatasource(PrismaClientApp.getInstance());
    const authRepository = new AuthRepository(dataSource);
    const authController = new AuthController(authRepository);

    router.post('/register', authController.registerUser);
    router.post('/login', authController.loginUser);
    router.post('/send-code', authController.sendCode);
    router.post('/verify-email', authController.verifyEmail);

    return router;
  }
}
