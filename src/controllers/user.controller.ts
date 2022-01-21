import { Request, Response } from "express";
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class User {
  /**
   * @method userRegistration
   * @param {*} req
   * @param {*} res
   * @description This method is used to register the user
   */
  userRegistration(req: Request, res: Response) {
    try {
      const userData = req.body;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const user = UserModel.getUserData(userData.email);
      if (!userData.fullname || userData.fullname.trim() === "") {
        res.status(401).send({
          Status: "Failure",
          Message: "Please enter full name.",
        });
      } else if (!emailRegex.test(userData.email)) {
        res.status(401).send({
          Status: "Failure",
          Message: "Please enter valid email address.",
        });
      } else if (userData.password.length < 6) {
        res.status(401).send({
          Status: "Failure",
          Message: "Please enter password with 6 or more characters.",
        });
      } else if (user) {
        res.status(401).send({
          Status: "Failure",
          Message: "There is already a user registered with same email.",
        });
      } else {
        const salt = 8;
        userData.password = bcrypt.hashSync(userData.password, salt);
        const newUser = new UserModel(
          userData.fullname,
          userData.email,
          userData.password
        );
        const result = newUser.save();
        if (result === true) {
          res.status(200).send({
            Status: "Success",
            Message: "User has been registered successfully.",
            Data: {},
          });
        }
      }
    } catch (err) {
      res.status(500).send({
        Status: "Failure",
        Message: "Failed to register the user.",
        Error: err,
      });
    }
  }

  /**
   * @method userRegistration
   * @param {*} req
   * @param {*} res
   * @description This method is used to get user logged in
   */
  userLogin(req: Request, res: Response) {
    try {
      const email = req.body.Email;
      const password = req.body.Password;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        res.status(401).send({
          Status: "Failure",
          Message: "Please enter valid email address.",
        });
      } else {
        const user = UserModel.getUserData(email);
        if (user) {
          bcrypt.compare(
            password,
            user.password,
            (err: any, compResult: any) => {
              if (compResult === true) {
                jwt.sign(
                  { id: user.userId },
                  "jwt_secret",
                  async (err: any, token: any) => {
                    try {
                      user.token = token;
                      const result = UserModel.updateUserData(user);
                      if (result) {
                        res.status(200).send({
                          Status: "Success",
                          Message: "User logged in succesfully.",
                          Data: user,
                        });
                      }
                    } catch (error) {
                      res.status(400).send({
                        Status: "Failure",
                        Message: "Failed to login!",
                        Error: error,
                      });
                    }
                  }
                );
              } else {
                res.status(401).send({
                  Status: "Failure",
                  Message: "Incorrect Password!",
                  Error: err,
                });
              }
            }
          );
        } else {
          res.status(500).send({
            Status: "Failure",
            Message: "We couldn't find any user with entered email.",
          });
        }
      }
    } catch (err: any) {
      res.status(500).send({
        Status: "Failure",
        Message: "Failed to login!",
        Error: err,
      });
    }
  }
}

module.exports = new User();
