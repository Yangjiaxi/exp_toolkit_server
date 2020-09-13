import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 一个实验中的一条记录信息
const recordSchema = createSchema({
  createTime: {
    type: Number,
    required: true,
  },
  data: {
    type: [
      {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const RecordModel = model("record", recordSchema);
export const RecordRepo = new RepositoryBase(RecordModel);
