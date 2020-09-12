import { ProjectRepo } from "../../database";

export const getAllProject = async (req, res, next) => {
  try {
    const projs = await ProjectRepo.query({});

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
    console.log(`Get ${projID}`);

    const projRawData = await ProjectRepo.queryById(projID);
    const { appendix, exps, title, createTime, fields } = projRawData;

    const schema = [];
    fields.forEach(({ name, showInProj }) => {
      if (showInProj) schema.push(name);
    });

    const data = {
      schema,
      data: [],
      createTime,
      projectName: title,
      appendix,
    };

    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
