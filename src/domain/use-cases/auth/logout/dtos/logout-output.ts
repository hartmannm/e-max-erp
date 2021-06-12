import { AppError } from "../../../../shared/error/app-error";
import Result from "../../../../shared/use-cases/result";

export default class LogoutOutput {

  constructor(public result: Result<void, AppError>) { }

}
