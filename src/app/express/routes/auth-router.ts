import { Router } from "express";
import LoginController from "../controllers/login-controller";

export class AuthRouter {

  private router: Router;

  constructor() {
    this.router = Router();
    this._configureRoutes();
  }

  private _configureRoutes(): void {
    this.router.get('/', LoginController.loginPage);
    this.router.post('/', LoginController.doLogin);
  }

  public getRouter(): Router {
    return this.router;
  }

}
