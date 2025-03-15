import { Server } from 'http';
import { WebSocket, WebSocketServer} from 'ws';
import { envs } from '@backend-wallet/env';

interface Options{
  server:Server;
  path?:string;
}

export class WssClientApp{
  private static _instance:WssClientApp;
  private wssClient:WebSocketServer;

  static get instance():WssClientApp{
    if(!WssClientApp._instance){
      throw "WssClientApp.instance not found";
    }
    return WssClientApp._instance;
  }

  private constructor(options:Options) {
    const { server, path='/ws' } = options;
    this.wssClient = new WebSocketServer({server});
    this.start();
  }

  static initWssClient(options:Options) {
    WssClientApp._instance = new WssClientApp(options);
  }

  public sendMessage(type:string, payload:object) {
      this.wssClient.clients.forEach(client=>{
        if(client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify({type, payload}));
        }
      })
  }

  public start(){
    this.wssClient.on('connection', (ws) => {
      console.log(`Connection ws started`);
      ws.on('close',()=>console.log('connection wss closed'));
    })
  }

}