import { Request, Response } from "express";

export default class HomeController {

  public static async homePage(req: Request, res: Response): Promise<void> {
    res.render('home/home');
  }

}
