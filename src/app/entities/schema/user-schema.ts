import { Decimal128 } from "mongodb";
import mongoose, { Schema } from "mongoose";
import User from "../user";

const UserSchema: Schema = new Schema(
  {
    cpf: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    resetPasswordSendAt: { type: Date },
    hash: { type: String, required: true },
    lastAccessDuration: { type: Decimal128 }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  }
);

mongoose.model<User>('User', UserSchema);

export default UserSchema;
