import { Router } from "express";
import HomeController from "../controllers/home-controller";

export default class HomeRouter {

  private router: Router;

  constructor() {
    this.router = Router();
    this._configureRoutes();
  }

  private _configureRoutes(): void {
    this.router.get('/', HomeController.homePage);
  }

  public getRouter(): Router {
    return this.router;
  }

}
