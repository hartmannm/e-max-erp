import { NextFunction } from "express";
import SessionHelper from "../../infra/auth/session-helper";
import { Request, Response } from 'express';

export default class AuthFilter {

  public async authenticateRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (SessionHelper.hasUserStored(req)) {
      next();
    } else {
      res.redirect('/login');
    }
  }

}
