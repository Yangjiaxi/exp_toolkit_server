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
  lastUpdateTime: {
    type: Number,
    default: null,
  },
  record: {
    // a list of `recordSchema` in `RecodeRepo`
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const ExperimentModel = model("experiment", experimentSchema);
export const ExperimentRepo = new RepositoryBase(ExperimentModel);
