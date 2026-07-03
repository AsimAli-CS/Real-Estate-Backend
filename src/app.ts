import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Database } from './config/database.congif';
import setup from './api/routes/base.route';
import logMiddleware from './middleware/logs.middleware';
import asyncLocalStorage from './utils/localStorage.util';
import { EnvSetup } from './utils/setEnv';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

class App {
  protected app: Application;
  protected database: Database;
  protected io: any;
  public socketInstance: any;
  protected httpServer: any;
  constructor() {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: `*`,
      },
    });
    this.config();
    this.database = new Database();
  }

  private config(): void {
    EnvSetup.setEnvVariables();
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(logMiddleware);
    this.app.use((req, res, next) => {
      const traceId = 'X-RE' + Date.now().toString().substring(4);
      asyncLocalStorage.run(new Map(), () => {
        const store = asyncLocalStorage.getStore();
        if (store) {
          store.set('traceId', traceId);
        }
        res.header('TraceId', traceId);
        next();
      });
    });

    setup(this.app);
  }

  public async start(): Promise<void> {
    const appPort = process.env.PORT || 3000;

    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected');
      this.socketInstance = socket;
    });

    this.httpServer.listen(appPort, () => {
      console.log(`Server running at http://localhost:${appPort}/`);
    });
  }
}

const app = new App();
app.start();

export default app;
