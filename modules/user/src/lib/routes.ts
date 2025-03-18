import { Router } from 'express';
import { PrismaRepository } from './repositories/prisma.repository';
import { PrismaClientApp } from '@backend-wallet/prisma-client';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const repository = new PrismaRepository(PrismaClientApp.getInstance());
    const userService = new UserService(repository);
    const userController = new UserController(userService);

    router.get('/me', userController.userDetail);

    return router;
  }
}
