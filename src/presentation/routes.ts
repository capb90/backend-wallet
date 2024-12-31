import { Router } from 'express';

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/api', (req, res) => {
      res.send({ message: 'Hello API' });
    });

    return router;
  }
}
