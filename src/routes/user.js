import { Router } from "express";

import {
  userRegister,
  // userRegisterVerify,
  userLogin,
  // handleLoginVerify,
  // getUserInfo,
  // modifyUserInfo,
  // modifyUserInfoVerify,
} from "../actions/user";

// import { jwtChecker } from "../middlewares/authorization";

const router = Router();

// router.post("/register", userRegisterVerify, userRegister);

router.post("/register", userRegister);

// router.get("/confirm", userComfirmEmail);

// router.post("/login", handleLoginVerify, userLogin);

router.post("/login", userLogin);

// router.use(jwtChecker);

// router.get("/info", getUserInfo);

// router.put("/info", modifyUserInfoVerify, modifyUserInfo);

export const user = router;
