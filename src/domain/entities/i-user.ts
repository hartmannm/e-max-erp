import { UserLevel } from "../shared/enums/user/user-level";

export default interface IUser {

  _id: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  userLevel: UserLevel;
  hash: string;
  lastAccessDuration: number;

}
