import express, { Router } from 'express';
import request from 'supertest';
import { AppRoutes } from './routes';

jest.mock('@backend-wallet/auth', () => ({
  AuthRoutes: {
    routes: Router().get('/', (_, res) => res.send('Auth router works!')),
  },
}));

describe('AppRoutes class', () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(AppRoutes.routes);
  });

  test('Should return instantiate of Routes', () => {
    const router = AppRoutes.routes;
    expect(router).toBeDefined();
    expect(typeof router).toBe('function');
  });

  test('Should include the route api/auth', async () => {
    const res = await request(app).get('/api/auth');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Auth router works!');
  });
});
