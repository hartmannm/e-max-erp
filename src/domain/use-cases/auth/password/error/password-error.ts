import { AppError } from "../../../../shared/error/app-error";
import { ErrorType } from "../../../../shared/error/error-type";

export default class PasswordError extends AppError {

  constructor(message: string) {
    super(message, ErrorType.USER_ERROR);
  }

}
