import IUser from '../../../../entities/i-user';
import IUserRepository from '../../../../infra/database/i-user-repository';
import EmailData from '../../../../infra/email/email-data';
import IEmailHandler from '../../../../infra/email/i-email-handler';
import ErrorHandler from '../../../../shared/error/error-handler';
import NotFoundError from '../../../../shared/error/not-found-error';
import IUseCase from '../../../../shared/use-cases/i-use-case';
import Result from '../../../../shared/use-cases/result';
import EmailValidator from '../../../../shared/validators/email-validator';
import PasswordRecoverInput from './dtos/password-recover-email-input';
import PasswordRecoverEmailOutput from './dtos/password-recover-email-output';
import PasswordRecoverOutput from './dtos/password-recover-email-output';

export default class PasswordRecoverEmailUseCase implements IUseCase<PasswordRecoverInput, PasswordRecoverOutput> {

  constructor(
    private userRepository: IUserRepository,
    private emailHandler: IEmailHandler
  ) { }

  async execute(input: PasswordRecoverInput): Promise<PasswordRecoverOutput> {
    try {
      EmailValidator.validate(input.email);
      const user = await this._getUser(input.email);
      await this._sendPasswordRecoverEmail(input, user);
      return new PasswordRecoverOutput(Result.ok(null));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new PasswordRecoverEmailOutput(Result.fail(err));
    }
  }

  private async _getUser(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError('Usuário inválido!');;
    }
    return user;
  }

  private async _sendPasswordRecoverEmail(input: PasswordRecoverInput, user: IUser): Promise<void> {
    const data = new EmailData();
    data.from = input.emailFrom;
    data.to = [user.email];
    data.subject = 'e-Max ERP - Redefinir senha'
    data.content =
    `
    <h1>Olá, ${user.name}!
    <br/>
    <p>Você solicitou a redefinição da sua senha. Clique <a href="${input.emailDestinLink}/${user.hash}">aqui</a> e acesse a página de redefinição de senha.
    `;
    await this.emailHandler.sendEmail(data);
  }

}

