import ICompanyUserRepository from "../../../domain/infra/database/i-company-user-repository";
import CompanyUser from "../../entities/company-user";
import mongoose from 'mongoose';
import CompanyUserSchema from "../../entities/schema/company-user-schema";
import iCompanyUser from "../../../domain/entities/i-company-user";

export default class CompanyUserRepository implements ICompanyUserRepository {

  public async createCompanyUser(user: CompanyUser): Promise<void> {
    const CompanyUser = mongoose.model('CompanyUser', CompanyUserSchema);
    CompanyUser.create(user);
  }

  public async findAll(): Promise<CompanyUser[]> {
    const CompanyUser = mongoose.model('CompanyUser', CompanyUserSchema);
    return CompanyUser.find().lean().exec()
      .then(users => users as unknown as CompanyUser[])
      .catch(() => null);
  }

  public async findById(id: string): Promise<CompanyUser> {
    const CompanyUser = mongoose.model('CompanyUser', CompanyUserSchema);
    return CompanyUser.findById(id).lean().exec()
      .then(user => user)
      .catch(() => null);
  }

  public async update(user: iCompanyUser): Promise<boolean> {
    const CompanyUser = mongoose.model('CompanyUser', CompanyUserSchema);
    return CompanyUser.updateOne({ _id: { $eq: user._id } }, user).then(res => res.ok === 1);
  }

}
