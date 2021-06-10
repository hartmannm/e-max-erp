import LoginController from "../controllers/login-controller";
import AbstractRouter from "./abstract-router";

export class AuthRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/', LoginController.loginPage);
    this.router.post('/', LoginController.doLogin);
  }

}
