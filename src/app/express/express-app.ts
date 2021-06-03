import express from 'express';
import configurations from '../infra/config/configurations';
import cors from 'cors';
import * as helmet from 'helmet';
import MongooseDatabase from '../infra/database/impl/mongoose-database';

export default class ExpressApp {

  public async runApp(): Promise<void> {
    const app = express();
    this._configureMiddlewares(app);
    await this._connectToDatabase();
    const port = configurations.port;
    console.log(`Server running on port ${port}`);
    app.listen(port);
  }

  private _configureMiddlewares(app: express.Application): void {
    const bodyParser = require('body-parser')
    // Habilitar caso use proxy reverso
    // app.enable('trust proxy');
    app.use(cors());
    app.use(helmet.default());
    app.use(bodyParser.json());
  }

  private async _connectToDatabase(): Promise<void> {
    const db = new MongooseDatabase();
    db.createConnection();
    console.log('Connected on database...');
  }

}
