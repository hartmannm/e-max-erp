export class AppError extends Error {

  constructor(message: string) {
    super(message);
    this.name = this._getErrorType();
  }

  private _getErrorType(): string {
    return this.constructor.name.toUpperCase();
  }

}
