import ICompany from "../../domain/entities/i-company";
import { Document } from "mongoose";

export default interface Company extends ICompany, Document<string, any> { }
