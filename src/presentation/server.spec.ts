import { envs } from '@backend-wallet/env';
import { Server } from './server';
import { Router } from 'express';
import request from 'supertest';
import * as http from 'http';

describe('Server class', () => {
  let server: Server;

  beforeEach(() => {
    server = new Server({ port: envs.PORT });
  });

  afterEach(() => {
    server.close();
  });

  test('Should instantiate the server correctly', () => {
    expect(server).toBeInstanceOf(Server);
  });

  test('Should configs express', () => {
    expect(server.app).toBeDefined();
  });

  test('Should router init', () => {
    const router = Router();
    router.get('/test', (__, res) => res.send('ok'));

    server.setRoutes(router);

    return request(server.app).get('/test').expect(200).expect('ok');
  });

  test('should init server', async () => {
    await server.start();
    expect(server.serverListener).toBeInstanceOf(http.Server);
  });

  test('Should close server without errors', async () => {
    await server.start();
    expect(() => server.close()).not.toThrow();
  });
});
