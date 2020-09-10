import { model } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 实验记录信息
const experimentSchema = createSchema({
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
  },
});

const ExperimentModel = model("experiment", experimentSchema);
export const ExperimentRepo = new RepositoryBase(ExperimentModel);
