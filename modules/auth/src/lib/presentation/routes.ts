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

    return router;
  }
}
