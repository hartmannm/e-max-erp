import ICompany from "../../entities/i-company";

export default interface ICompanyRepository {

  findByCnpj(cnpj: string): Promise<ICompany>;

  existsByCnpj(cnpj: string): Promise<boolean>;

  existsById(id: string): Promise<boolean>;

  createCompany(company: ICompany): Promise<void>

  getCompanies(): Promise<ICompany[]>;

  findById(id: string): Promise<ICompany>;

  update(user: ICompany): Promise<boolean>;

}
