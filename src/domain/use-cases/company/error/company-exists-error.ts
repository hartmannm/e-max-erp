import { AppError } from "../../../shared/error/app-error";
import { ErrorType } from "../../../shared/error/error-type";

export default class CompanyExistsError extends AppError {

  constructor() {
    super('Companhia já existe!', ErrorType.USER_ERROR);
  }

}
