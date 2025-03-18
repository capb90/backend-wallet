import { Router } from 'express';
import { AuthRoutes } from '@backend-wallet/auth';
import { UserRoutes } from '@backend-wallet/user';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use('/api/user', UserRoutes.routes);

    return router;
  }
}
