import ICompany from "./i-company";
import IRole from "./i-role";
import IUser from "./i-user";

export default interface ICompanyUser {

  _id?: string;
  company: ICompany;
  role: IRole;
  user: IUser;
  createdAt?: Date;
  updatedAt?: Date;

}
