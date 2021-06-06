import { AppError } from "./app-error";
import { ErrorType } from "./error-type";

export default class ErrorHandler {

  public static normalizeError(err: Error): AppError {
    if (err instanceof AppError) {
      return err;
    }
    return new AppError(err.message, ErrorType.SYSTEM_ERROR);
  }

}
