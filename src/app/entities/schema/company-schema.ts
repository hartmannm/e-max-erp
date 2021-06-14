import mongoose, { Schema } from "mongoose";
import Company from "../company";

const CompanySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    corporateName: { type: String, required: true },
    cnpj: { type: String, required: true }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

mongoose.model<Company>('Company', CompanySchema);

export default CompanySchema;

