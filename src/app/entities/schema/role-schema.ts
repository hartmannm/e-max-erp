import mongoose, { Schema } from "mongoose";
import Role from "../role";

const RoleSchema: Schema = new Schema(
  {
    isManager: { type: Boolean },
    name: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

mongoose.model<Role>('Role', RoleSchema);

export default RoleSchema;
