import { Request, Response } from "express";
import AuthController from "../../../boundaries/controllers/auth-controller";
import ExpressAdapter from "../adapters/express-adapter";
import SessionHelper from "../infra/auth/session-helper";

export default class LoginController {

  public static async loginPage(req: Request, res: Response): Promise<void> {
    if (SessionHelper.hasUserStored(req)) {
      res.redirect('/');
    } else {
      res.render('login/login-form');
    }
  }

  public static async doLogin(req: Request, res: Response): Promise<void> {
    const result = await ExpressAdapter.adapt(AuthController.login, req);
    if (result.hasError()) {
      const error = result.getError();
      res.render('login/login-form', { context: req.body, error: error });
    } else {
      await SessionHelper.saveUserSession(req, result.getValue());
      res.redirect('/')
    }
  }

}
