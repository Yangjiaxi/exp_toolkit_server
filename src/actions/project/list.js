import { ExperimentRepo, ProjectRepo, RecordRepo } from "../../database";

export const getAllProject = async (req, res, next) => {
  try {
    const projs = await ProjectRepo.query({
      isDeleted: false,
      isDestroyed: false,
    });

    const data = projs.map(({ lastUpdateTime, lastUseTime, _id, title }) => ({
      _id,
      title,
      lastUpdate: lastUpdateTime,
      lastUse: lastUseTime,
    }));

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const getDeletedProject = async (req, res, next) => {
  try {
    const projs = await ProjectRepo.query({
      isDeleted: true,
      isDestroyed: false,
    });

    const data = projs.map(({ lastUpdateTime, lastUseTime, _id, title }) => ({
      _id,
      title,
      lastUpdate: lastUpdateTime,
      lastUse: lastUseTime,
    }));

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const getProjectInfo = async (req, res, next) => {
  try {
    const { projID } = req.params;

    const projRawData = await ProjectRepo.queryById(projID);
    const { appendix, exps, title, createTime, fields } = projRawData;

    const schema = [];
    const filter = [];
    const schemaMapping = {};
    fields.forEach(({ name, showInProj, jsonKey }) => {
      if (showInProj) {
        schema.push(name);
        filter.push(jsonKey);
        schemaMapping[jsonKey] = name;
      }
    });

    const expDataRaw = await Promise.all(
      exps.map(async expID => ExperimentRepo.queryById(expID)),
    );

    const expData = await Promise.all(
      expDataRaw.map(async ({ _id, record }) => {
        if (record === undefined || record.length === 0)
          return {
            _id,
            datas: [],
          };

        const latestRecordID = record[record.length - 1];
        const {
          data: datasRaw,
          createTime: createTimeRecord,
        } = await RecordRepo.queryById(latestRecordID);
        const datas = [];
        datasRaw.forEach(({ key, value }) => {
          if (filter.includes(key)) {
            datas.push({ key: schemaMapping[key], value });
          }
        });
        return {
          _id,
          lastUpdate: createTimeRecord,
          datas,
        };
      }),
    );

    const data = {
      schema,
      data: expData,
      createTime,
      projectName: title,
      appendix,
    };

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
