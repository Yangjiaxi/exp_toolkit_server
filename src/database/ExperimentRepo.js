import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 实验所有记录信息
const experimentSchema = createSchema({
  projectID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  createTime: {
    type: Number,
    required: true,
  },
  records: {
    // a list of `recordSchema` in `RecodeRepo`
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

const ExperimentModel = model("experiment", experimentSchema);
export const ExperimentRepo = new RepositoryBase(ExperimentModel);
