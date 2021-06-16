import AppUserController from "../controllers/app-user-controller";
import { FormActions } from "../miscelaneous/enums/form-actions.enum";
import AbstractRouter from "./abstract-router";

export class UserRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.get('/', AppUserController.userGrid);
    this.router.post('/', AppUserController.createUpdate);
    this.router.get('/logged-user', AppUserController.loggedUser);
    this.router.get(`/${FormActions.CREATE}`, AppUserController.createPage);
    this.router.get(`/:id/${FormActions.READ}`, AppUserController.readPage);
  }

}
