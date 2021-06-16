import ICompanyUser from "../../entities/i-company-user";
import IUser from "../../entities/i-user";
import ICrypto from "../../infra/auth/i-crypto";
import ICompanyRepository from "../../infra/database/i-company-repository";
import ICompanyUserRepository from "../../infra/database/i-company-user-repository";
import IRoleRepository from "../../infra/database/i-role-repository";
import IUserRepository from "../../infra/database/i-user-repository";
import EmailData from "../../infra/email/email-data";
import IEmailHandler from "../../infra/email/i-email-handler";
import ErrorHandler from "../../shared/error/error-handler";
import IUseCase from "../../shared/use-cases/i-use-case";
import Result from "../../shared/use-cases/result";
import CreateUserInput from "./dtos/create-user-input";
import CreateUpdateUserInput from "./dtos/create-user-input";
import CreateUserOutput from "./dtos/create-user-output";
import UserExistsError from "./error/user-exits-error";

export default class CreateUserUseCase implements IUseCase<CreateUserInput, CreateUserOutput>{

  constructor(
    private userRepository: IUserRepository,
    private roleRepository: IRoleRepository,
    private crypto: ICrypto,
    private companyRepository: ICompanyRepository,
    private companyUserRepository: ICompanyUserRepository,
    private emailHandler: IEmailHandler
  ) { }

  public async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    try {
      await this._validateName(input);
      await this._validateEmail(input);
      const role = await this.roleRepository.findById(input.roleId);
      const user = await this._buildUser(input)
      await this.userRepository.createUser(user);
      const company = await this.companyRepository.findById(input.companyId);
      const companyUser: ICompanyUser = { user, company, role }
      this.companyUserRepository.createCompanyUser(companyUser);
      this._sendPasswordDefineEmail(input, user);
      return new CreateUserOutput(Result.ok(companyUser));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new CreateUserOutput(Result.fail(err));
    }
  }

  private async _validateName(input: CreateUserInput): Promise<void> {
    const userExists = await this.userRepository.findByName(input.name);
    if (userExists) {
      throw new UserExistsError(`Já existe um usuário com o nome "${input.name}" cadastrado!`);
    }
  }

  private async _validateEmail(input: CreateUserInput): Promise<void> {
    const userExists = await this.userRepository.findByEmail(input.email);
    if (userExists) {
      throw new UserExistsError(`Já existe um usuário com o email "${input.email}" cadastrado!`);
    }
  }

  private async _buildUser(input: CreateUserInput): Promise<IUser> {
    const userHash = await this._createUserHash(input);
    return {
      cpf: input.cpf,
      email: input.email,
      hash: userHash,
      name: input.name,
      phone: input.phone,
    }
  }

  private _createUserHash(input: CreateUpdateUserInput): Promise<string> {
    return this.crypto.encrypt(input.email);
  }

  private async _sendPasswordDefineEmail(input: CreateUpdateUserInput, user: IUser): Promise<void> {
    const data = new EmailData();
    data.from = input.email;
    data.to = [user.email];
    data.subject = 'e-Max ERP - Redefinir senha'
    data.content =
    `
    <h1>Olá, ${user.name}!
    <br/>
    <p>Você foi cadastrado no nosso sistema, antes de acessar é necessário redefinir sua senha.</p>
    <p>Clique <a href="${input.emailLink}?hash=${user.hash}">aqui</a> e acesse a página de redefinição de senha.</p>
    `;
    await this.emailHandler.sendEmail(data);
  }

}
