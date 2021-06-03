import { AppError } from "../error/app-error";

export default class Result<S, E = AppError> {

  private value: S;
  private error: E;

  constructor(value?: S, error?: E) {
    this.value = value;
    this.error = error;
  }

  public getValue(): S {
    if (this.error) {
      throw new Error("Não é possível retornar o valor de um erro. Utilize getError().")
    }
    return this.value as S;
  }

  public getError(): E {
    return this.error as E;
  }

  public hasError(): boolean {
    return this.error !== null && this.error !== undefined;
  }

  public static ok<T>(result: T): Result<T, null> {
    return new Result<T, null>(result);
  }

  public static fail<T extends AppError>(error: T): Result<null, T> {
    return new Result<null, T>(undefined, error);
  }

}
