import { errorRes } from "../utils";
import { errorDict } from "../configs/errorDict";

export const noMatch = (req, res, next) => {
  if (!req.route) {
    return next(errorRes(errorDict.NO_SUCH_PATH, "error"));
  }
  return next();
};
