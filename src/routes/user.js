import { Router } from "express";

import {
  userRegister,
  userRegisterVerify,
  userLogin,
  handleLoginVerify,
  getUserInfo,
  modifyUserInfo,
  modifyUserInfoVerify,
} from "../actions/user";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.post("/register", userRegisterVerify, userRegister);

router.post("/login", handleLoginVerify, userLogin);

router.use(jwtChecker);

router.get("/info", getUserInfo);

router.put("/info", modifyUserInfoVerify, modifyUserInfo);

export const user = router;
