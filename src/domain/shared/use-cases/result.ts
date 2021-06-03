import { AppError } from "../error/app-error";

export default class Result<S, E = AppError> {

  constructor(public value?: S, public error?: E) { }

  public getValue(): S {
    if (this.error) {
      throw new Error("Não é possível retornar o valor de um erro. Utilize getError().")
    }
    return this.value as S;
  }

  public getError(): E {
    return this.error as E;
  }

  public static ok<T>(result: T): Result<T> {
    return new Result<T>(result);
  }

  public static fail<T extends AppError>(error: T): Result<T> {
    return new Result<T>(undefined, error);
  }

}
