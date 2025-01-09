import { Router } from 'express';

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    router.get('/login', (req, res) => {
      res.send({ message: 'Hello API from AUTH module' });
    });

    router.get('/register', (req, res) => {
      res.send({ message: 'Hello API from AUTH module' });
    });

    return router;
  }
}
