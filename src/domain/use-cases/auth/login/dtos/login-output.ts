import IUser from "../../../../entities/i-user";
import { AppError } from "../../../../shared/error/app-error";
import Result from "../../../../shared/use-cases/result";

export default class LoginOutput {

  constructor(public result: Result<IUser, AppError>) { }

}
