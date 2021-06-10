import { Request, Response } from "express";
import ExpressAdapter from "../adapters/express-adapter";
import SessionHelper from "../infra/auth/session-helper";
import AuthController from "../../../boundaries/controllers/auth-controller";

export default class PasswordController {

  public static async forgotPasswordPage(req: Request, res: Response): Promise<void> {
    if (SessionHelper.hasUserStored(req)) {
      res.redirect('/');
    } else {
      res.render('password/forgot-password');
    }
  }

  public static async forgotPasswordEmail(req: Request, res: Response): Promise<void> {
    const result = await ExpressAdapter.adapt(AuthController.forgotPasswordEmail, req);
    if (result.hasError()) {
      const error = result.getError();
      res.render('password/forgot-password', { passwordData: req.body, error: error });
    } else {
      res.render('password/forgot-password', { message: 'Solicitação efetuada com sucesso! Enviaremos um email para realizar a alteração de senha!' });
    }
  }

  public static async passwordChangeForm(req: Request, res: Response): Promise<void> {
    if (SessionHelper.hasUserStored(req)) {
      res.redirect('/');
    } else {
      res.render('password/password-change-form');
    }
  }

  public static async passwordChange(req: Request, res: Response): Promise<void> {
    const result = await ExpressAdapter.adapt(AuthController.changePassword, req);
    // TODO: Tratar retorno
  }

}
