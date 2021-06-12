import LoginController from "../controllers/login-controller";
import LogoutController from "../controllers/logout-controller";
import AbstractRouter from "./abstract-router";

export class AuthRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/login', LoginController.loginPage);
    this.router.post('/login', LoginController.doLogin);
    this.router.post('/logout', LogoutController.doLogout);
  }

}
