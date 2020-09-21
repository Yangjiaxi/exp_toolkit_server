import { errorDict } from "../../configs/errorDict";
import { ExperimentRepo, ProjectRepo } from "../../database";
import { errorRes } from "../../utils";
import { ObjectId } from "mongodb";

export const deleteExpRow = async (req, res, next) => {
  try {
    const { expID } = req.params;
    const rawExp = await ExperimentRepo.queryById(expID);
    if (!rawExp) {
      return next(errorRes(errorDict.NO_SUCH_EXP, "error"));
    }
    const { projectID } = rawExp;

    await ProjectRepo.pullById(projectID, { exps: ObjectId(expID) });
    await ProjectRepo.updateById(projectID, { lastUseTime: Date.now() });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
