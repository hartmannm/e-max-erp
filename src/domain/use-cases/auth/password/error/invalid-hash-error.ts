import { AppError } from "../../../../shared/error/app-error";
import { ErrorType } from "../../../../shared/error/error-type";

export default class InvalidHash extends AppError {

  constructor() {
    super('Hash de usuário inválido', ErrorType.USER_ERROR);
  }

}
