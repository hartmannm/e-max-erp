import { AppError } from "../../../../../shared/error/app-error";
import Result from "../../../../../shared/use-cases/result";

export default class PasswordRecoverEmailOutput {

  constructor(public result: Result<any, AppError>) { }

}
