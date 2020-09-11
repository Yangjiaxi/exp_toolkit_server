import { ProjectRepo, CounterRepo } from "../../database";

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
    const data = {
      schema: ["状态", "配置", "MRR@5", "进度"],
      data: [
        {
          _id: "1231313",
          datas: [
            { key: "状态", value: "FIN" },
            { key: "配置", value: "2x1,4" },
            {
              key: "MRR@5",
              value: "0.0984",
            },
            {
              key: "进度",
              value: "20/20",
            },
          ],
          lastUpdate: 6666666,
        },
        {
          _id: "1231313",
          datas: [
            { key: "状态", value: "gpu3" },
            { key: "配置", value: "4x1,4" },
            {
              key: "MRR@5",
              value: "0.0984",
            },
            {
              key: "进度",
              value: "5/20",
            },
          ],
          lastUpdate: 6666666,
        },
        {
          _id: "1231313",
          datas: [
            { key: "状态", value: "gpu0" },
            { key: "配置", value: "2x1,4" },
            {
              key: "MRR@5",
              value: "0.0984",
            },
            {
              key: "进度",
              value: "5/20",
            },
          ],
          lastUpdate: 6666666,
        },
      ],
      createTime: 1231323,
      projectName: "哈哈哈哈哈哈哈哈",
      appendix: "line1\nline2   123123\nline3",
    };
    res.json({ data, type: "success" });
  } catch (error) {
    return next(error);
  }
};
