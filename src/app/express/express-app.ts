import express from 'express';
import configurations from '../infra/config/configurations';
import cors from 'cors';
import * as helmet from 'helmet';
import MongooseDatabase from '../infra/database/impl/mongoose-database';
import { AuthRouter } from './routes/auth-router';
import path from 'path';
import exphbs from 'express-handlebars';
import session = require("express-session");
import HomeRouter from './routes/home-router';
import AuthFilter from './middlewares/auth/auth-filter';
import MongoStore from 'connect-mongo';
import { PasswordRouter } from './routes/password-router';
import EmailHandler from '../infra/email/email-handler';
import { UserRouter } from './routes/user-router';
import CompanyRouter from './routes/company-router';

export default class ExpressApp {

  public async runApp(): Promise<void> {
    const app = express();
    this._configureViews(app);
    this._configureSession(app);
    this._configureMiddlewares(app);
    this._configureRouter(app);
    await this._connectToDatabase();
    await this._connectToEmailServer();
    const port = configurations.port;
    console.log(`Server running on port ${port}`);
    app.listen(port);
  }

  _configureSession(app: express.Application) {
    app.use(session({
      secret: configurations.sessionSecret,
      name: 'uniqueSessionID',
      saveUninitialized: false,
      store: MongoStore.create({mongoUrl: MongooseDatabase.getDatabaseUrl()}),
      resave: false,
      cookie: { maxAge: 3600000, secure: false, httpOnly: true }
    }))
  }

  private _configureMiddlewares(app: express.Application): void {
    const bodyParser = require('body-parser')
    // Habilitar caso use proxy reverso
    // app.enable('trust proxy');
    app.use(cors());
    // app.use(helmet.default());
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
  }

  private _configureViews(app: express.Application): void {
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, 'views'));
    app.engine('hbs', exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
      partialsDir: path.join(__dirname, 'views/partials')
    }));
    app.use(express.static(path.join(__dirname, 'public')));
  }

  private async _connectToDatabase(): Promise<void> {
    const db = new MongooseDatabase();
    db.createConnection();
    console.log('Connected on database...');
  }

  private _configureRouter(app: express.Application): void {
    app.use('/', new AuthRouter().getRouter());
    app.use('/password', new PasswordRouter().getRouter());
    // A partir deste ponto todas as requisições devem ser acessadas com o usuário logado
    const authFilter = new AuthFilter();
    app.use('/', authFilter.authenticateRequest, new HomeRouter().getRouter());
    app.use('/company', authFilter.authenticateRequest, new CompanyRouter().getRouter());
    app.use('/user', authFilter.authenticateRequest, new UserRouter().getRouter());
  }

  private async _connectToEmailServer(): Promise<void> {
    const emailHandler = new EmailHandler();
    await emailHandler.connectToServer();
  }

}
