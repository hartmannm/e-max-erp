import IUser from '../../../entities/i-user';
import ICrypto from '../../../infra/auth/i-crypto';
import IUserRepository from '../../../infra/database/i-user-repository';
import ErrorHandler from '../../../shared/error/error-handler';
import NotFoundError from '../../../shared/error/not-found-error';
import IUseCase from '../../../shared/use-cases/i-use-case';
import Result from '../../../shared/use-cases/result';
import EmailValidator from '../../../shared/validators/email-validator';
import LoginInput from './dtos/login-input';
import LoginOutput from './dtos/login-output';

export default class LoginUseCase implements IUseCase<LoginInput, LoginOutput> {

  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ) { }

  async execute(input: LoginInput): Promise<LoginOutput> {
    try {
      EmailValidator.validate(input.email);
      const user = await this._getUser(input.email);
      await this._validatePassword(input.password, user);
      delete user.password;
      return new LoginOutput(Result.ok(user));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new LoginOutput(Result.fail(err));
    }
  }

  private async _getUser(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this._throwError();
    }
    return user;
  }

  private async _validatePassword(inputPassword: string, user: IUser): Promise<void> {
    const isPasswordValid = await this.crypto.compare(user.password, inputPassword);
    if (!isPasswordValid) {
      this._throwError();
    }
  }

  private _throwError(): void {
    throw new NotFoundError('Usuário ou senha inválidos');
  }

}
