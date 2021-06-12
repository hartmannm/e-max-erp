import { Request, Response } from "express";
import SessionHelper from "../infra/auth/session-helper";

export default class UserController {

  public static async loggedUser(req: Request, res: Response): Promise<void> {
    const user = SessionHelper.getUser(req);
    res.json(user);
  }

}
