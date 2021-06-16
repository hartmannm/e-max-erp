import Result from "../../domain/shared/use-cases/result";
import IRequestData from "../interfaces/i-request-data";
import { AppError } from "../../domain/shared/error/app-error";
import CompanyRepository from "../../app/infra/repository/company-repository";
import CreateUserUseCase from "../../domain/use-cases/user/create-user-use-case";
import UserRepository from "../../app/infra/repository/user-repository";
import RoleRepository from "../../app/infra/repository/role-repository";
import CompanyUserRepository from "../../app/infra/repository/company-user-repository";
import Crypto from "../../app/infra/auth/crypto";
import ICompanyUser from "../../domain/entities/i-company-user";
import LinksFactory from "../shared/auth/links-factory";
import EmailHandler from "../../app/infra/email/email-handler";

export default class UserController {

  public static async createUser(request: IRequestData): Promise<Result<ICompanyUser, AppError>> {
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    const companyRepository = new CompanyRepository();
    const companyUserRepository = new CompanyUserRepository();
    const crypto = new Crypto();
    const emailHandler = new EmailHandler()
    request.body.emailLink = LinksFactory.createChangePasswordLink();
    const response = await new CreateUserUseCase(userRepository, roleRepository, crypto, companyRepository, companyUserRepository, emailHandler)
      .execute(request.body);
    return response.result;
  }

}
