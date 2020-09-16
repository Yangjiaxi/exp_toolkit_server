import { ExperimentRepo, ProjectRepo, RecordRepo } from "../../database";

export const getExpInfo = async (req, res, next) => {
  try {
    const { expID } = req.params;

    const { record, projectID, createTime } = await ExperimentRepo.queryById(
      expID,
    );

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
