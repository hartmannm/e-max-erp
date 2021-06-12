import { Request, Response } from "express";
import AuthController from "../../../boundaries/controllers/auth-controller";
import ExpressAdapter from "../adapters/express-adapter";
import SessionHelper from "../infra/auth/session-helper";

export default class LogoutController {

  public static async doLogout(req: Request, res: Response): Promise<void> {
    if (!SessionHelper.hasUserStored(req)) {
      res.redirect('login/login-form');
    }
    req.body = {
      loginDate: SessionHelper.getLoginDate(req),
      userEmail: SessionHelper.getUser(req).email
    };
    await ExpressAdapter.adapt(AuthController.logout, req);
    SessionHelper.clear(req);
    res.status(200).send();
  }

}
