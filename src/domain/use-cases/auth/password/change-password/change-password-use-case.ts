import IUser from '../../../../entities/i-user';
import IUserRepository from '../../../../infra/database/i-user-repository';
import EmailData from '../../../../infra/email/email-data';
import IEmailHandler from '../../../../infra/email/i-email-handler';
import ErrorHandler from '../../../../shared/error/error-handler';
import NotFoundError from '../../../../shared/error/not-found-error';
import IUseCase from '../../../../shared/use-cases/i-use-case';
import Result from '../../../../shared/use-cases/result';
import EmailValidator from '../../../../shared/validators/email-validator';
import ChangePasswordInput from './dtos/change-password-input';
import ChangePasswordOutput from './dtos/change-password-output';

export default class ChangePasswordUseCase implements IUseCase<ChangePasswordInput, ChangePasswordOutput> {

  constructor(private userRepository: IUserRepository) { }

  async execute(input: ChangePasswordInput): Promise<ChangePasswordOutput> {
    try {
      EmailValidator.validate(input.email);
      const user = await this._getUser(input.email);
      this._runValidations(input, user);
      // TODO: alterar a senha, gerar novo hash, salvar usuário

      return null;
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      // return new PasswordRecoverEmailOutput(Result.fail(err));
    }
  }

  private async _getUser(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Usuário inválido!');;
    }
    return user;
  }


  private _runValidations(input: ChangePasswordInput, user: IUser) {
    // TODO: Validar senhas e hash
  }

}


