import iUser from "../../../domain/entities/i-user";
import IUserRepository from "../../../domain/infra/database/i-user-repository";
import mongoose from 'mongoose';
import UserSchema from "../../entities/schema/user-schema";
import User from '../../entities/user';

export default class UserRepository implements IUserRepository {

  public async findByEmail(email: string): Promise<iUser> {
    const User = mongoose.model('User', UserSchema);
    return (await User.findOne({ email }))?.toObject<User>();
  }

  public async update(user: User): Promise<boolean> {
    const User = mongoose.model('User', UserSchema);
    return User.updateOne({ _id: { $eq: user._id } }, user).then(res => res.ok === 1);
  }

}
