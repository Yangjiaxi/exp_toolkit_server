import { model, Schema } from "mongoose";
import { createSchema, RepositoryBase } from "./Base";

// 项目信息
const projectSchema = createSchema({
  title: {
    type: String,
    required: true,
  },
  createTime: {
    type: Number,
    required: true,
  },
  // when create, lastUseTime === createTime
  lastUseTime: {
    type: Number,
    required: true,
  },
  lastUpdateTime: {
    type: Number,
    default: null,
  },
  appendix: {
    type: String,
    default: "",
  },
  fields: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        jsonKey: {
          type: String,
          required: true,
        },
        showInProj: {
          type: Boolean,
          default: false,
        },
      },
    ],
    default: [],
  },
  exps: {
    // a list of `experimentSchema` in `ExperimentRepo`
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const ProjectModel = model("project", projectSchema);
export const ProjectRepo = new RepositoryBase(ProjectModel);
