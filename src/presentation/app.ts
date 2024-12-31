import { envs } from '../config';
import { AppRoutes } from './routes';
import { Server } from './server';

export class App {
  public static run() {
    const server = new Server({
      port: envs.PORT,
    });

    server.setRoutes(AppRoutes.routes);

    server.start();
  }
}
