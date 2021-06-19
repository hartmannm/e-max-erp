import ICompanyUser from "../../domain/entities/i-company-user";
import { Document } from "mongoose";

export default interface CompanyUser extends ICompanyUser, Document<string, any> { }
