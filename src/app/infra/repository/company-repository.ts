import iCompany from "../../../domain/entities/i-company";
import ICompanyRepository from "../../../domain/infra/database/i-company-repository";
import mongoose from 'mongoose';
import CompanySchema from "../../entities/schema/company-schema";
import Company from "../../entities/company";

export default class CompanyRepository implements ICompanyRepository {

  public async findByCnpj(cnpj: string): Promise<Company> {
    const Company = mongoose.model('Company', CompanySchema);
    return (await Company.findOne({ cnpj: cnpj })).toObject<Company>();
  }

  public async existsByCnpj(cnpj: string): Promise<boolean> {
    const Company = mongoose.model('Company', CompanySchema);
    return Company.exists({ cnpj: cnpj });
  }

  public async existsById(id: string): Promise<boolean> {
    const Company = mongoose.model('Company', CompanySchema);
    return Company.exists({ _id: id });
  }

  public async createCompany(company: iCompany): Promise<void> {
    const Company = mongoose.model('Company', CompanySchema);
    await Company.create(company);
  }

  public async getCompanies(): Promise<Company[]> {
    const Company = mongoose.model('Company', CompanySchema);
    return await Company.find().lean();
  }

  public async findById(id: string): Promise<Company> {
    const Company = mongoose.model('Company', CompanySchema);
    var query = Company.findById(id)
    return query.lean().exec()
      .then(company => company)
      .catch(() => null);
  }

  public async update(company: Company): Promise<boolean> {
    const Company = mongoose.model('Company', CompanySchema);
    return Company.updateOne({ _id: { $eq: company._id } }, company).then(res => res.ok === 1);
  }

}
