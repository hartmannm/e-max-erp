import IUser from "../../../../domain/entities/i-user";
import { Request } from 'express';

export default class SessionHelper {

  public static saveUserSession(req: Request, user: IUser): void {
    req.session['user'] = user;
    req.session['loginDate'] = new Date();
  }

  public static hasUserStored(req: Request): boolean {
    return req.session['user'] !== null && req.session['user'] !== undefined;
  }

  public static getUser(req: Request): IUser {
    return req.session['user']
  }

  public static clear(req: Request): void {
    req.session.destroy(() => {});
  }

  public static getLoginDate(req: Request): IUser {
    return req.session['loginDate']
  }

}
