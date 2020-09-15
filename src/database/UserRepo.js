import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 用户信息
export const userSchema = createSchema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    hash: String,
    salt: String,
  },
  // 注册时间
  time: {
    type: Number,
    required: true,
  },
  // a list of `projectSchema` in ProjectRepo
  projects: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const UserModel = model("user", userSchema);
export const UserRepo = new RepositoryBase(UserModel);
