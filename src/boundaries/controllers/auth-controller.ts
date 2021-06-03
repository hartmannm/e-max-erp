import Result from "../../domain/shared/use-cases/result";
import LoginUseCase from "../../domain/use-cases/auth/login/login-use-case";
import IRequestData from "../interfaces/i-request-data";

export default class AuthController {

  public static async login(request: IRequestData): Promise<Result<any, any>> {
    const loginResponse = await new LoginUseCase(null).execute(request.body);
    return loginResponse.result;
  }

}
