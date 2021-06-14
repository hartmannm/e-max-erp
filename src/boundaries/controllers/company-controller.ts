import Result from "../../domain/shared/use-cases/result";
import IRequestData from "../interfaces/i-request-data";
import { AppError } from "../../domain/shared/error/app-error";
import ICompany from "../../domain/entities/i-company";
import CnpjValidator from "../../app/infra/documents/cnpj-validator";
import CompanyRepository from "../../app/infra/repository/company-repository";
import CreateUpdateCompanyUseCase from "../../domain/use-cases/company/create-update-company-use-case";

export default class CompanyController {

  public static async createOrUpdateCompany(request: IRequestData): Promise<Result<ICompany, AppError>> {
    const response = await new CreateUpdateCompanyUseCase(new CompanyRepository(), new CnpjValidator()).execute(request.body);
    return response.result;
  }

}
