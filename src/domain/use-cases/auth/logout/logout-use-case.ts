import IUserRepository from '../../../infra/database/i-user-repository';
import ErrorHandler from '../../../shared/error/error-handler';
import IUseCase from '../../../shared/use-cases/i-use-case';
import Result from '../../../shared/use-cases/result';
import LogoutInput from './dtos/logout-input';
import LoginInput from './dtos/logout-input';
import LogoutOutput from './dtos/logout-output';
import LoginOutput from './dtos/logout-output';

export default class LogoutUseCase implements IUseCase<LogoutInput, LogoutOutput> {

  constructor(private userRepository: IUserRepository) { };

  async execute(input: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userRepository.findByEmail(input.userEmail);
      const sessioDuration = this._getSessionDuration(input.loginDate);
      user.lastAccessDuration = sessioDuration;
      await this.userRepository.update(user);
      return new LogoutOutput(Result.ok(null));
    } catch (error) {
      const err = ErrorHandler.normalizeError(error);
      return new LogoutOutput(Result.fail(err));
    }
  }

  private _getSessionDuration(loginDate: Date): number {
    let diff = (new Date().getTime() - new Date(loginDate).getTime()) / 1000;
    diff /= 60;
    // Converte para minutos
    return Math.abs(Math.round(diff));
  }

}
