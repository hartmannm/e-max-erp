import IUser from "../../entities/i-user";

export default interface IUserRepository {

  findByEmail(email: string): Promise<IUser>;

}
