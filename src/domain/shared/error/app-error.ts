import { ErrorType } from "./error-type";

export class AppError extends Error {

  constructor(public message: string, public errorType: ErrorType) {
    super(message);
    this.name = this._getErrorType();
  }

  private _getErrorType(): string {
    return this.constructor.name.toUpperCase();
  }

  public isUserError(): boolean {
    return this.errorType === ErrorType.USER_ERROR;
  }

  public isSystemError(): boolean {
    return this.errorType === ErrorType.SYSTEM_ERROR;
  }

}
