import { AppError } from "./app-error";
import { ErrorType } from "./error-type";

export default class NotFoundError extends AppError {

  constructor(message: string) {
    super(message, ErrorType.USER_ERROR);
  }

}
