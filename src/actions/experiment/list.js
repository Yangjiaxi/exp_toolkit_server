import { errorDict } from "../../configs/errorDict";
import { ExperimentRepo, ProjectRepo, RecordRepo } from "../../database";
import { errorRes } from "../../utils";

export const getExpInfo = async (req, res, next) => {
  try {
    const { expID } = req.params;
    const exp = await ExperimentRepo.queryById(expID);
    if (!exp) {
      return next(errorRes(errorDict.NO_SUCH_EXP, "error"));
    }
    const { record, projectID, createTime } = exp;
    const { fields, title } = await ProjectRepo.queryById(projectID);

    const schema = [];
    const schemaMapping = {};
    fields.forEach(({ name, jsonKey }) => {
      schema.push(name);
      schemaMapping[jsonKey] = name;
    });

    const expData = await Promise.all(
      record.map(async recordID => {
        const {
          data: datas,
          createTime: createTimeRecord,
        } = await RecordRepo.queryById(recordID);
        return {
          createTime: createTimeRecord,
          datas: datas.map(({ key, value }) => ({
            key: schemaMapping[key],
            value,
          })),
        };
      }),
    );

    const data = {
      schema,
      data: expData,
      createTime,
      projectID,
      title,
    };

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
