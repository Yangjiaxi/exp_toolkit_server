import { body, validationResult } from "express-validator";
import crypto from "crypto";

import { UserRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorDict } from "../../configs/errorDict";

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await UserRepo.queryById(res.locals.id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }
    const { _id, username, email, time } = user;
    res.json({ data: { _id, username, email, time }, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const modifyUserInfo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const { msg } = errors.array({ onlyFirstError: true })[0];
      return next(errorRes(msg, "error"));
    }

    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }

    const { newPassword, oldPassword } = req.body;

    const { hash, salt } = user.password;
    if (hash !== crypto.scryptSync(oldPassword, salt, 64).toString()) {
      return next(errorRes(errorDict.BAD_LOGIN, "error"));
    }
    if (newPassword && typeof newPassword === "string") {
      const newSalt = crypto.randomBytes(16).toString("base64");
      const newHash = crypto.scryptSync(newPassword, newSalt, 64).toString();
      await UserRepo.updateById(id, {
        password: {
          salt: newSalt,
          hash: newHash,
        },
      });
      res.json({ type: "success" });
    } else {
      return next(errorRes(errorDict.BAD_PWD, "error"));
    }
  } catch (error) {
    return next(error);
  }
};

export const modifyUserInfoVerify = [
  body("oldPassword")
    .isString()
    .isLength({ min: 6 })
    .withMessage(errorDict.BAD_PASSWORD),
  body("newPassword")
    .isString()
    .isLength({ min: 6 })
    .withMessage(errorDict.BAD_PASSWORD),
];
