import IUser from "../../entities/i-user";

export default interface IUserRepository {

  findByEmail(email: string): Promise<IUser>;

  update(user: IUser): Promise<boolean>;

  findByName(name: string): Promise<IUser>;

  createUser(iser: IUser): Promise<IUser>;

  findAll(): Promise<IUser[]>

}
