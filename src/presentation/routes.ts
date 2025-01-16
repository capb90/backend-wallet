import { AuthRoutes } from '@backend-wallet/auth';
import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);

    return router;
  }
}
