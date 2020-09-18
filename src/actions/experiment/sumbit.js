import { ExperimentRepo, RecordRepo, ProjectRepo } from "../../database";

export const registerExp = async (req, res, next) => {
  try {
    const { projID: projectID } = req.params;
    const exp = await ExperimentRepo.createAndInsert({
      projectID,
      createTime: new Date(),
    });

    await ProjectRepo.pushById(projectID, { exps: exp._id });
    await ProjectRepo.updateById(projectID, { lastUpdateTime: Date.now() });

    res.json({ data: { _id: exp._id }, type: "success" });
  } catch (error) {
    return next(error);
  }
};

export const sumbitExpData = async (req, res, next) => {
  try {
    const { expID } = req.params;

    const data = req.body;
    const kvList = [];
    for (const [key, value] of Object.entries(data)) {
      kvList.push({
        key,
        value,
      });
    }

    const time = new Date();

    const record = await RecordRepo.createAndInsert({
      createTime: time,
      data: kvList,
    });

    const { projectID } = await ExperimentRepo.queryById(expID);
    await ExperimentRepo.pushById(expID, { record: record._id });
    await ExperimentRepo.updateById(expID, { lastUpdateTime: time });
    await ProjectRepo.updateById(projectID, { lastUpdateTime: time });

    res.json({ type: "success" });
  } catch (error) {
    return next(error);
  }
};
