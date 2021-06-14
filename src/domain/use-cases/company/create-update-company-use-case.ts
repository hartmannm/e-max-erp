import ICompanyRepository from "../../infra/database/i-company-repository";
import ICnpjValidator from "../../infra/documents/i-cnpj-validator";
import ErrorHandler from "../../shared/error/error-handler";
import NotFoundError from "../../shared/error/not-found-error";
import IUseCase from "../../shared/use-cases/i-use-case";
import Result from "../../shared/use-cases/result";
import CreateUpdateCompanyInput from "./dtos/create-update-company-input";
import CreateUpdateCompanyOutput from "./dtos/create-update-company-output";
import CreateCompanyOutput from "./dtos/create-update-company-output";
import CompanyExistsError from "./error/company-exists-error";
import InvalidCnpjError from "./error/invalid-cnpj-error";

export default class CreateUpdateCompanyUseCase implements IUseCase<CreateUpdateCompanyInput, CreateUpdateCompanyOutput> {

  constructor(private companyRepository: ICompanyRepository, private cnpjvalidator: ICnpjValidator) { }

  public async execute(input: CreateUpdateCompanyInput): Promise<CreateUpdateCompanyOutput> {
    try {
      if (input._id) {
        return this._update(input);
      }
      return this._create(input);
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new CreateCompanyOutput(Result.fail(err));
    }
  }

  private async _create(input: CreateUpdateCompanyInput): Promise<CreateUpdateCompanyOutput> {
    this._validateCnpj(input.cnpj);
    await this._validateCompanyExists(input.cnpj);
    await this.companyRepository.createCompany(input);
    const company = await this.companyRepository.findByCnpj(input.cnpj);
    return new CreateCompanyOutput(Result.ok(company));
  }

  private async _update(input: CreateUpdateCompanyInput): Promise<CreateUpdateCompanyOutput> {
    const companyExists = await this.companyRepository.existsById(input._id);
    if (!companyExists) {
      throw new NotFoundError('Company not found!');
    }
    this._validateCnpj(input.cnpj);
    const company = await this.companyRepository.findById(input._id);
    delete input._id;
    Object.keys(input).forEach(key => company[key] = input[key]);
    await this.companyRepository.update(company);
    return new CreateCompanyOutput(Result.ok(company));
  }

  private _validateCnpj(cnpj: string): void {
    if (!this.cnpjvalidator.isCnpjValid(cnpj)) {
      throw new InvalidCnpjError(cnpj);
    }
  }

  private async _validateCompanyExists(cnpj: string): Promise<void> {
    const companyExists = await this.companyRepository.existsByCnpj(cnpj);
    if (companyExists) {
      throw new CompanyExistsError();
    }
  }

}
