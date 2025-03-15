import { createServer } from 'http';
import { envs, RedisClientApp } from '../config';
import { AppRoutes } from './routes';
import { Server } from './server';
import { WssClientApp } from '../config/wss-client';

export class App {
  public static run() {
    const server = new Server({
      port: envs.PORT,
    });

    const httpServer = createServer(server.app);
    WssClientApp.initWssClient({server: httpServer});

    new RedisClientApp();

    server.setRoutes(AppRoutes.routes);

    httpServer.listen(envs.PORT, () => {
      console.log(`Server running on port: ${ envs.PORT }`);
      console.log(`Server mode ${envs.MODE}`);
    })
  }
}
