import IUser from '../../../../entities/i-user';
import ICrypto from '../../../../infra/auth/i-crypto';
import IUserRepository from '../../../../infra/database/i-user-repository';

import ErrorHandler from '../../../../shared/error/error-handler';
import NotFoundError from '../../../../shared/error/not-found-error';
import IUseCase from '../../../../shared/use-cases/i-use-case';
import Result from '../../../../shared/use-cases/result';
import EmailValidator from '../../../../shared/validators/email-validator';
import InvalidHash from '../error/invalid-hash-error';
import PasswordError from '../error/password-error';
import ChangePasswordInput from './dtos/change-password-input';
import ChangePasswordOutput from './dtos/change-password-output';

export default class ChangePasswordUseCase implements IUseCase<ChangePasswordInput, ChangePasswordOutput> {

  constructor(
    private userRepository: IUserRepository,
    private crypto: ICrypto
  ) { }

  async execute(input: ChangePasswordInput): Promise<ChangePasswordOutput> {
    try {
      EmailValidator.validate(input.email);
      const user = await this._getUser(input.email);
      this._runValidations(input, user);
      user.password = await this._createPassword(input);
      user.hash = await this._createHash(user);
      await this.userRepository.update(user);
      return new ChangePasswordOutput(Result.ok(user.email));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new ChangePasswordOutput(Result.fail(err));
    }
  }

  private async _getUser(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Usuário inválido!');
    }
    return user;
  }

  private _runValidations(input: ChangePasswordInput, user: IUser) {
    this._validatePassword(input.password);
    this._matchPasswords(input);
    this._validateHash(input, user);
  }

  private _validatePassword(password: string) {
    const isPasswordValid = password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g);
    if (!isPasswordValid) {
      throw new PasswordError('Senha possui formato inválido!');
    }
  }

  private _matchPasswords(input: ChangePasswordInput) {
    if (input.password !== input.passwordConfirm) {
      throw new PasswordError('As senhas são diferentes!');
    }
  }

  private _validateHash(input: ChangePasswordInput, user: IUser) {
    if (input.hash !== user.hash) {
      throw new InvalidHash();
    }
  }

  private async _createPassword(input: ChangePasswordInput): Promise<string> {
    return this.crypto.encrypt(input.password);
  }

  private async _createHash(user: IUser): Promise<string> {
    return this.crypto.encrypt(`${new Date().getTime()}-${user._id}`);
  }

}


