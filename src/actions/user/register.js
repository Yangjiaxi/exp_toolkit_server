import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { UserRepo, CounterRepo } from "../../database";

import { errorRes } from "../../utils";

export const userRegister = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }
    const { username, email, password } = req.body;

    if ((await UserRepo.query({ username }))[0]) {
      return next(errorRes("用户名已存在", "error"));
    }
    if ((await UserRepo.query({ email }))[0]) {
      return next(errorRes("该邮箱已注册", "error"));
    }

    const time = new Date();
    const salt = crypto.randomBytes(16).toString("base64");
    const hash = crypto.scryptSync(password, salt, 64).toString();

    await UserRepo.createAndInsert({
      username,
      email,
      password: { salt, hash },
      time,
    });

    await CounterRepo.update({ key: "user" }, { $inc: { value: 1 } });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const userRegisterVerify = [
  body("username")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Username too short."),
  body("email")
    .isEmail()
    .withMessage("Invalid E-Mail address."),
  body("password")
    .isString()
    .isLength({ min: 6 })
    .withMessage("Password too short."),
];
