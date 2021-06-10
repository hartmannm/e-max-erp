import HomeController from "../controllers/home-controller";
import AbstractRouter from "./abstract-router";

export default class HomeRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/', HomeController.homePage);
  }

}
