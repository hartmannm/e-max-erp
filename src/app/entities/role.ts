import IRole from "../../domain/entities/i-role";
import { Document } from "mongoose";

export default interface Role extends IRole, Document<string, any> { }
