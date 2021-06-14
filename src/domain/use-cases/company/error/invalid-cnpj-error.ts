import { AppError } from "../../../shared/error/app-error";
import { ErrorType } from "../../../shared/error/error-type";

export default class InvalidCnpjError extends AppError {

  constructor(cnpj: string) {
    super(`CNPJ ${cnpj} inválido!`, ErrorType.USER_ERROR);
  }

}
