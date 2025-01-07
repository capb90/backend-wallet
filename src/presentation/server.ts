import express, { Router } from 'express';
import * as http from 'http';
import { IOptionsServer } from '../interfaces';
import { setupSwagger } from '../config';

export class Server {
  public readonly app = express();
  private serverListener?: http.Server;
  private readonly port: number;

  constructor(options: IOptionsServer) {
    this.port = options.port;
    this.configure();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    setupSwagger(this.app);
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  public async start() {
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
