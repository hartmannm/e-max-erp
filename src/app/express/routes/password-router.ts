import PasswordController from "../controllers/password-controller";
import AbstractRouter from "./abstract-router";

export class PasswordRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/forgot-password', PasswordController.forgotPasswordPage);
    this.router.post('/forgot-password', PasswordController.forgotPasswordEmail);
    this.router.get('/password-change/:hash', PasswordController.passwordChangeForm);
    this.router.post('/password-change', PasswordController.passwordChange);
  }

}
