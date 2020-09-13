import { ProjectRepo } from "../../database";

export const moveToTrash = async (req, res, next) => {
  try {
    const { projID } = req.params;
    await ProjectRepo.updateById(projID, { isDeleted: true });
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const deleteForever = async (req, res, next) => {
  try {
    const { projID } = req.params;
    await ProjectRepo.updateById(projID, { isDestroyed: true });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const restoreFromTrash = async (req, res, next) => {
  try {
    const { projID } = req.params;
    await ProjectRepo.updateById(projID, { isDeleted: false });
    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
