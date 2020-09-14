import { ProjectRepo, CounterRepo } from "../../database";

export const createProject = async (req, res, next) => {
  try {
    const { title, appendix, fields } = req.body;

    const timestamp = Date.now();
    const fieldsFixed = fields.map(({ name, jsonKey, showInProj }) => ({
      name,
      jsonKey,
      showInProj,
    }));
    const newProject = await ProjectRepo.createAndInsert({
      title,
      createTime: timestamp,
      lastUseTime: timestamp,
      appendix,
      fields: fieldsFixed,
    });
    await CounterRepo.update({ key: "proj" }, { $inc: { value: 1 } });
    res.json({ data: { _id: newProject._id }, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const modifyProject = async (req, res, next) => {
  try {
    const { projID } = req.params;
    const { title, appendix, fields } = req.body;
    await ProjectRepo.updateById(projID, { title, appendix, fields });
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
