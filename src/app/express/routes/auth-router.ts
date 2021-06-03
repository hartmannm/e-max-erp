import { Router, Request, Response } from "express";
import AuthController from "../../../boundaries/controllers/auth-controller";
import { AppError } from "../../../domain/shared/error/app-error";
import Result from "../../../domain/shared/use-cases/result";
import ExpressAdapter from "../adapters/express-adapter";
import OutputAdapter from "../adapters/output-adapter";

export class AuthRouter {

  private router: Router;

  constructor() {
    this.router = Router();
    this._configureRoutes();
  }

  private _configureRoutes(): void {
    this.router.post('/', ExpressAdapter.adapt(AuthController.login, async (req: Request, res: Response, result: Result<any, AppError>) => {
      if (result.hasError()) {
        const error = result.getError();
        return res.status(error.isUserError() ? 400 : 500).json(OutputAdapter.jsonAdapt(result));
      }
      res.json(OutputAdapter.jsonAdapt(result))
    }));
  }

  public getRouter(): Router {
    return this.router;
  }

}
