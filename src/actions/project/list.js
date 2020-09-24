import {
  ExperimentRepo,
  ProjectRepo,
  RecordRepo,
  UserRepo,
  checkID,
} from "../../database";

import { errorRes } from "../../utils";
import { errorDict } from "../../configs/errorDict";
import { forEachAsync } from "../../utils/forEachAsync";

export const getAllProject = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }

    const { projects } = user;

    const data = [];
    await forEachAsync(projects, async projID => {
      const proj = await ProjectRepo.queryById(projID);
      if (proj) {
        const { isDeleted, isDestroyed } = proj;
        if (!isDeleted && !isDestroyed) {
          const { lastUpdateTime, lastUseTime, _id, title } = proj;
          data.push({
            _id,
            title,
            lastUpdate: lastUpdateTime,
            lastUse: lastUseTime,
          });
        }
      }
    });

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const getDeletedProject = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }

    const { projects } = user;

    const data = [];
    await forEachAsync(projects, async projID => {
      const proj = await ProjectRepo.queryById(projID);
      if (proj) {
        const { isDeleted, isDestroyed } = proj;
        // NOTE
        if (isDeleted && !isDestroyed) {
          const { deleteTime, _id, title } = proj;
          data.push({
            _id,
            title,
            deleteTime,
          });
        }
      }
    });

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const getProjectInfo = async (req, res, next) => {
  try {
    const { projID } = req.params;
    if (!checkID(projID)) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }

    const projRawData = await ProjectRepo.queryById(projID);
    if (!projRawData) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }

    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }
    const { projects } = user;
    if (!projects.includes(projID)) {
      await UserRepo.pushById(id, { projects: projID });
    }

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
      expDataRaw.map(async ({ _id, record, comment }) => {
        if (record === undefined || record.length === 0)
          return {
            _id,
            comment,
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
          comment,
          lastUpdate: createTimeRecord,
          datas,
        };
      }),
    );

    await ProjectRepo.updateById(projID, { lastUseTime: Date.now() });

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

export const getProjectConf = async (req, res, next) => {
  try {
    const { projID } = req.params;

    const projRawData = await ProjectRepo.queryById(projID);
    if (!projRawData) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }
    const { appendix, title, fields } = projRawData;

    const data = {
      appendix,
      title,
      fields: fields.map(({ showInProj, name, jsonKey }) => ({
        showInProj,
        name,
        jsonKey,
      })),
    };

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
