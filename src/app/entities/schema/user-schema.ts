import mongoose, { Schema } from "mongoose";
import { UserLevel } from "../../../domain/shared/enums/user/user-level";
import User from "../user";

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userLevel: { type: String, enum: UserLevel },
  hash: { type: String, required: true }
});

mongoose.model<User>('User', UserSchema);

export default UserSchema;
