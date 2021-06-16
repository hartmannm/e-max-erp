import ICompanyUser from "../../entities/i-company-user";

export default interface ICompanyUserRepository {

  createCompanyUser(user: ICompanyUser): Promise<void>;

  findAll(): Promise<ICompanyUser[]>

  findById(id: string): Promise<ICompanyUser>

  update(user: ICompanyUser): Promise<boolean>;

}
