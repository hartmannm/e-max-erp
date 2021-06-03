import { AppError } from "./app-error";
import { ErrorType } from "./error-type";

export default class InvalidEmailError extends AppError {

  constructor() {
    super('Email inválido!', ErrorType.USER_ERROR);
  }

}
