import IUserRepository from '../../../infra/database/i-user-repository';
import { ErrorHandler } from '../../../shared/error/error-handler';
import IUseCase from '../../../shared/use-cases/i-use-case';
import Result from '../../../shared/use-cases/result';
import EmailValidator from '../../../shared/validators/email-validator';
import LoginInput from './dtos/login-input';
import LoginOutput from './dtos/login-output';

export default class LoginUseCase implements IUseCase<LoginInput, LoginOutput> {

  constructor(private userRepository: IUserRepository) { }

  async execute(input: LoginInput): Promise<LoginOutput> {
    try {
      EmailValidator.validate(input.email);
      const user = await this.userRepository.findByEmail(input.email);
      return new LoginOutput(Result.ok(user));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new LoginOutput(Result.fail(err));
    }
  }

}

