import { AppError } from "./app-error";

export default class InvalidEmailError extends AppError {

  constructor() {
    super('Email inválido!');
  }

}
