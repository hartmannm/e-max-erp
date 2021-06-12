import UserController from "../controllers/user-controller";
import AbstractRouter from "./abstract-router";

export class UserRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/logged-user', UserController.loggedUser);
  }

}
