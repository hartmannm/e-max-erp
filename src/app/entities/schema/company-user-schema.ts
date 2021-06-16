import mongoose, { Schema } from "mongoose";
import CompanyUser from "../company-user";
import CompanySchema from "./company-schema";
import RoleSchema from "./role-schema";
import UserSchema from "./user-schema";

const CompanyUserSchema: Schema = new Schema(
  {
    company: CompanySchema,
    role: RoleSchema,
    user: UserSchema
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

mongoose.model<CompanyUser>('CompanyUser', CompanyUserSchema);

export default CompanyUserSchema;
