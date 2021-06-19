import IUserRepository from "../../../domain/infra/database/i-user-repository";
import mongoose from 'mongoose';
import UserSchema from "../../entities/schema/user-schema";
import User from '../../entities/user';
import IUser from "../../../domain/entities/i-user";

export default class UserRepository implements IUserRepository {

  public async findByEmail(email: string): Promise<IUser> {
    const User = mongoose.model('User', UserSchema);
    return User.findOne({ email: email }).exec()
      .then(user => user)
      .catch(() => null);
  }

  public async update(user: User): Promise<boolean> {
    const User = mongoose.model('User', UserSchema);
    return User.updateOne({ _id: { $eq: user._id } }, user).then(res => res.ok === 1);
  }

  public async findByName(name: string): Promise<IUser> {
    const User = mongoose.model('User', UserSchema);
    return User.findOne({ name: name }).exec()
      .then(user => user)
      .catch(() => null);
  }

  public async createUser(user: User): Promise<IUser> {
    const User = mongoose.model('User', UserSchema);
    return User.create(user).then(user => user as unknown as IUser);
  }

  public async findAll(): Promise<User[]> {
    const User = mongoose.model('User', UserSchema);
    return User.find().exec()
      .then(users => users as unknown as User[])
      .catch(() => null);
  }

}
