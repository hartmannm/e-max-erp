import ICompanyUser from "../../../entities/i-company-user";
import { AppError } from "../../../shared/error/app-error";
import Result from "../../../shared/use-cases/result";

export default class CreateUserOutput {

  constructor(public result: Result<ICompanyUser, AppError>) { }

}
