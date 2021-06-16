import { Request, Response } from "express";
import UserController from "../../../boundaries/controllers/user-controller";
import CompanyRepository from "../../infra/repository/company-repository";
import CompanyUserRepository from "../../infra/repository/company-user-repository";
import RoleRepository from "../../infra/repository/role-repository";
import ExpressAdapter from "../adapters/express-adapter";
import ListToComboBoxAdapter from "../adapters/list-to-combo-box-adapter";
import SessionHelper from "../infra/auth/session-helper";
import ComboBoxDataModel from "../miscelaneous/models/combo-box-data.model";
import DateUtils from "../miscelaneous/utils/date-utils";

export default class AppUserController {

  public static async loggedUser(req: Request, res: Response): Promise<void> {
    const user = SessionHelper.getUser(req);
    res.json(user);
  }

  public static async userGrid(_: Request, res: Response): Promise<void> {
    const companyUserRepository = new CompanyUserRepository();
    const users = await companyUserRepository.findAll();
    users.forEach(companyUser => delete companyUser.user.password);
    res.render('user/user-grid', { users: users });
  }

  public static async createPage(_: Request, res: Response): Promise<void> {
    const roles = await AppUserController._getRolesToComboBox();
    const companies = await AppUserController._getCompaniesToComboBox();
    res.render('user/user-form', { context: { roles, companies } });
  }

  public static async createUpdate(req: Request, res: Response): Promise<void> {
    const result = await ExpressAdapter.adapt(UserController.createUser, req);
    if (result.hasError()) {
      console.log(req.body)
      const roles = await AppUserController._getRolesToComboBox(req.body.roleId);
      const companies = await AppUserController._getCompaniesToComboBox(req.body.companyId);
      res.render('user/user-form', {
        context: { user: req.body, roles, companies },
        error: result.getError(),
        isUpdateAccess: req.body.id !== undefined,
      });
    } else {
      res.redirect('/user');
    }
  }

  public static async readPage(req: Request, res: Response): Promise<void> {
    const userRepository = new CompanyUserRepository();
    const companyUser = await userRepository.findById(req.params.id);
    if (!companyUser) {
      res.render('error/404');
    } else {
      delete companyUser.user.password;
      const roles = await AppUserController._getRolesToComboBox(companyUser.role._id.toString());
      const companies = await AppUserController._getCompaniesToComboBox(companyUser.company._id.toString());
      res.render('user/user-form', {
        context: { user: companyUser.user, roles, companies },
        isReadAccess: true,
        createdAt: DateUtils.formatDayMonthYear(companyUser.createdAt),
        updatedAt: DateUtils.formatDayMonthYear(companyUser.updatedAt)
      });
    }
  }

  private static async _getRolesToComboBox(selectedRoleId?: string): Promise<ComboBoxDataModel[]> {
    const roleRepository = new RoleRepository();
    const roles = await roleRepository.findAll();
    if (selectedRoleId) {
      return ListToComboBoxAdapter.adapt(roles, '_id', 'name', (role) => role._id.toString() == selectedRoleId);
    }
    return ListToComboBoxAdapter.adapt(roles, '_id', 'name');
  }

  private static async _getCompaniesToComboBox(selectedCompanyId?: string): Promise<ComboBoxDataModel[]> {
    const companyRepository = new CompanyRepository();
    const companies = await companyRepository.findAll();
    if (selectedCompanyId) {
      return ListToComboBoxAdapter.adapt(companies, '_id', 'name', (company) => company._id.toString() == selectedCompanyId);
    };
    return ListToComboBoxAdapter.adapt(companies, '_id', 'name');
  }

}
