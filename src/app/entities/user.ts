import IUser from "../../domain/entities/i-user";
import { Document } from "mongoose";

export default interface User extends IUser, Document<string, any> { }
