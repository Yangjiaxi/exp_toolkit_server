import { errorRes, verifyJWT } from "../utils";
import { errorDict } from "../configs/errorDict";

export const jwtChecker = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const jwt = req.get("Authorization");
  if (!jwt) {
    return next(errorRes(errorDict.NO_JWT, "error"));
  }
  try {
    res.locals.id = verifyJWT(jwt);
    next();
  } catch (e) {
    return next(errorRes(errorDict.INVALID_JWT, "error"));
  }
};
