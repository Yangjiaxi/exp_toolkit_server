import { ProjectRepo } from "../../database";
import { errorRes } from "../../utils";
import { errorDict } from "../../configs/errorDict";

export const moveToTrash = async (req, res, next) => {
  try {
    const { projID } = req.params;
    const proj = await ProjectRepo.queryById(projID);
    if (!proj) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }

    await ProjectRepo.updateById(projID, { isDeleted: true });
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const deleteForever = async (req, res, next) => {
  try {
    const { projID } = req.params;
    const proj = await ProjectRepo.queryById(projID);
    if (!proj) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }
    await ProjectRepo.updateById(projID, { isDestroyed: true });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const restoreFromTrash = async (req, res, next) => {
  try {
    const { projID } = req.params;
    const proj = await ProjectRepo.queryById(projID);
    if (!proj) {
      return next(errorRes(errorDict.NO_SUCH_PROJ, "error"));
    }
    await ProjectRepo.updateById(projID, { isDeleted: false });
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
