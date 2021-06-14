import ICompany from "../../../entities/i-company";
import { AppError } from "../../../shared/error/app-error";
import Result from "../../../shared/use-cases/result";

export default class CreateUpdateCompanyOutput {

  constructor(public result: Result<ICompany, AppError>) { }

}
