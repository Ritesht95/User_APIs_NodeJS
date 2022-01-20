import { Request, Response } from "express";

class User {
  /**
   * @method userRegistration
   * @param {*} req
   * @param {*} res
   * @description This method is used to register the user
   */
  userRegistration(req: Request, res: Response) {
    res.json({ Status: "Success" });
    // TODO: Implement user registration
  }

  /**
   * @method userRegistration
   * @param {*} req
   * @param {*} res
   * @description This method is used to get user logged in
   */
  userLogin(req: Request, res: Response) {
    res.json({ Status: "Success" });
    // TODO: Implement user login
  }
}

module.exports = new User();
