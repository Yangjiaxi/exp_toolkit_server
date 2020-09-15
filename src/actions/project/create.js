import { ProjectRepo, CounterRepo, UserRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorDict } from "../../configs/errorDict";

export const createProject = async (req, res, next) => {
  try {
    const { id } = res.locals;
    const user = await UserRepo.queryById(id);
    if (!user) {
      return next(errorRes(errorDict.NO_SUCH_USER, "error"));
    }

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
    await UserRepo.pushById(id, { pushById: newProject._id });

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
