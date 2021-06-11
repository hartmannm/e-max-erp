import { Router } from "express";

export default abstract class AbstractRouter {

  protected router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  protected abstract configureRoutes(): void;

  public getRouter(): Router {
    return this.router;
  }

}
