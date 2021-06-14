import { Request, Response } from "express";
import CompanyController from "../../../boundaries/controllers/company-controller";
import NotFoundError from "../../../domain/shared/error/not-found-error";
import CompanyRepository from "../../infra/repository/company-repository";
import ExpressAdapter from "../adapters/express-adapter";
import { FormActions } from "../miscelaneous/enums/form-actions.enum";
import DateUtils from "../miscelaneous/utils/date-utils";

export default class AppCompanyController {

  public static async createPage(_: Request, res: Response): Promise<void> {
    res.render('company/company-form');
  }

  public static async getCompanies(_: Request, res: Response): Promise<void> {
    const companyRepository = new CompanyRepository();
    const companies = await companyRepository.getCompanies();
    res.render('company/company-grid', { companies: companies });
  }

  public static async createUpdate(req: Request, res: Response): Promise<void> {
    const result = await ExpressAdapter.adapt(CompanyController.createOrUpdateCompany, req);
    if (result.hasError()) {
      const error = result.getError();
      if (error.name === NotFoundError.name) {
        res.render('error/404');
      } else {
        res.render('company/company-form', { context: req.body, error: error, isUpdateAccess: req.body._id !== undefined });
      }
    } else {
      res.redirect('/company');
    }
  }

  public static async readUpdatePage(req: Request, res: Response): Promise<void> {
    const companyRepository = new CompanyRepository();
    const company = await companyRepository.findById(req.params.id);
    if (!company) {
      res.render('error/404');
    } else {
      res.render('company/company-form', {
        context: company,
        isReadAccess: req.params.action === FormActions.READ,
        isUpdateAccess: req.params.action === FormActions.UPDATE,
        createdAt: DateUtils.formatDayMonthYear(company.createdAt),
        updatedAt: DateUtils.formatDayMonthYear(company.updatedAt)
      });
    }
  }

}
