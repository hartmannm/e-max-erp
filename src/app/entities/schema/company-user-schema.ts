import mongoose, { Schema } from "mongoose";
import CompanyUser from "../company-user";

const CompanyUserSchema: Schema = new Schema(
  {
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
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
