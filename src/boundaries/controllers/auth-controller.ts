import UserRepository from "../../app/infra/repository/user-repository";
import Result from "../../domain/shared/use-cases/result";
import LoginUseCase from "../../domain/use-cases/auth/login/login-use-case";
import IRequestData from "../interfaces/i-request-data";
import Crypto from '../../app/infra/auth/crypto';
import IUser from "../../domain/entities/i-user";
import { AppError } from "../../domain/shared/error/app-error";

export default class AuthController {

  public static async login(request: IRequestData): Promise<Result<IUser, AppError>> {
    const loginResponse = await new LoginUseCase(new UserRepository(), new Crypto()).execute(request.body);
    return loginResponse.result;
  }

}
