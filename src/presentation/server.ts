import express, { Router } from 'express';
import * as http from 'http';
import { IOptionsServer } from '../interfaces';
import cors from 'cors';


export class Server {
  private _serverListener?: http.Server;
  private readonly port: number;
  public readonly app = express();

  public get serverListener(){
    return this._serverListener;
  } 

  constructor(options: IOptionsServer) {
    this.port = options.port;
    this.configure();
  }

  private configure() {
    this.app.use(express.json());
    this.app.use(cors({origin:'http://localhost:5173', credentials:true}))
    this.app.use(express.urlencoded({ extended: true }));
  }

  public setRoutes(router: Router) {
    this.app.use(router);
  }

  public async start() {
    this._serverListener = this.app.listen(this.port, async () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this._serverListener?.close();
  }
}
