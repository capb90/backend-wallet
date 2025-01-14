import { ExpressAuth } from '@auth/express';
import Google from '@auth/express/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { AuthRoutes } from '@backend-wallet/auth';
import { envs } from '@backend-wallet/env';
import { PrismaClientApp } from '../config';
import { Router } from 'express';

const prisma = PrismaClientApp.getInstance();

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use('/api/auth', AuthRoutes.routes);
    router.use(
      '/auth',
      ExpressAuth({
        providers: [
          Google({
            clientId: envs.AUTH_GOOGLE_ID,
            clientSecret: envs.AUTH_GOOGLE_SECRET,
          }),
        ],
        secret: envs.JWT_SEED,
        session: {
          strategy: 'jwt',
        },
        adapter: PrismaAdapter(prisma),
      })
    );

    return router;
  }
}
