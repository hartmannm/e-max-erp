export default interface IUser {

  _id?: string;
  cpf: string;
  email: string;
  password?: string;
  name: string;
  phone: string;
  resetPasswordSendAt?: Date;
  hash: string;
  lastAccessDuration?: number;
  createdAt?: Date;
  updatedAt?: Date;

}
