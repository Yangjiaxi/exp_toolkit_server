import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { errorDict } from "../../configs/errorDict";
import { errorRes, generateJWT } from "../../utils";
import { UserRepo } from "../../database";

export const userLogin = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }
    const { username, password } = req.body;
    const user = (await UserRepo.query({ username }))[0];
    if (!user) {
      return next(errorRes(errorDict.BAD_LOGIN, "error"));
    }

    const { hash, salt } = user.password;
    if (hash !== crypto.scryptSync(password, salt, 64).toString()) {
      return next(errorRes(errorDict.BAD_LOGIN, "error"));
    }
    const token = generateJWT({ id: user._id }, 604800);
    res.json({
      token,
      type: "success",
    });
  } catch (error) {
    return next(error);
  }
};

export const handleLoginVerify = [
  body("username")
    .isString()
    .withMessage(errorDict.BAD_LOGIN),
  body("password")
    .isString()
    .withMessage(errorDict.BAD_LOGIN),
];
