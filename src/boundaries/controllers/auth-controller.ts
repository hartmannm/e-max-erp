import UserRepository from "../../app/infra/repository/user-repository";
import Result from "../../domain/shared/use-cases/result";
import LoginUseCase from "../../domain/use-cases/auth/login/login-use-case";
import IRequestData from "../interfaces/i-request-data";
import Crypto from '../../app/infra/auth/crypto';
import IUser from "../../domain/entities/i-user";
import { AppError } from "../../domain/shared/error/app-error";
import PasswordRecoverEmailUseCase from "../../domain/use-cases/auth/password/recover-email/password-recover-email-use-case";
import EmailHandler from "../../app/infra/email/email-handler";
import PasswordRecoverInput from "../../domain/use-cases/auth/password/recover-email/dtos/password-recover-email-input";
import configurations from "../../app/infra/config/configurations";
import ChangePasswordUseCase from "../../domain/use-cases/auth/password/change-password/change-password-use-case";
import LogoutUseCase from "../../domain/use-cases/auth/logout/logout-use-case";
import LinksFactory from "../shared/auth/links-factory";

export default class AuthController {

  public static async login(request: IRequestData): Promise<Result<IUser, AppError>> {
    const loginResponse = await new LoginUseCase(new UserRepository(), new Crypto()).execute(request.body);
    return loginResponse.result;
  }

  public static async forgotPasswordEmail(request: IRequestData): Promise<Result<any, AppError>> {
    const input: PasswordRecoverInput = {
      email: request.body.email,
      emailDestinLink: LinksFactory.createChangePasswordLink(),
      emailFrom: configurations.emailUser
    };
    const loginResponse = await new PasswordRecoverEmailUseCase(new UserRepository(), new EmailHandler()).execute(input);
    return loginResponse.result;
  }

  public static async changePassword(request: IRequestData): Promise<Result<string, AppError>> {
    const loginResponse = await new ChangePasswordUseCase(new UserRepository(), new Crypto()).execute(request.body);
    return loginResponse.result;
  }

  public static async logout(request: IRequestData): Promise<Result<void, AppError>> {
    const loginResponse = await new LogoutUseCase(new UserRepository()).execute(request.body);
    return loginResponse.result;
  }

}
