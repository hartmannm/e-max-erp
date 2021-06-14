import AppCompanyController from "../controllers/app-company-controller";
import { FormActions } from "../miscelaneous/enums/form-actions.enum";
import AbstractRouter from "./abstract-router";

export default class CompanyRouter extends AbstractRouter {

  protected configureRoutes(): void {
    this.router.post('/', AppCompanyController.createUpdate);
    this.router.get('/', AppCompanyController.getCompanies);
    this.router.get(`/${FormActions.CREATE}`, AppCompanyController.createPage);
    this.router.get('/:id/:action', AppCompanyController.readUpdatePage);
  }

}
