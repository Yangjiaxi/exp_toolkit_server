import { Router } from "express";

import {
  deleteExpRow,
  getExpInfo,
  sumbitExpData,
  registerExp,
} from "../actions/experiment";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

// 在运行端提交结果，不需要检查JWT
router.post("/submit/:expID", sumbitExpData);

// 在运行端注册一个实验，不需要检查JWT
router.post("/register/:projID", registerExp);

router.use(jwtChecker);

// 获得一个实验的信息
router.get("/info/:expID", getExpInfo);

// 删除一个实验行
router.delete("/delete/:expID", deleteExpRow);

// 从回收站回复
// router.get("/restore/:expID", restoreFromTrash);

// 销毁项目
// router.delete("/destroy/:expID", deleteForever);

export const experiment = router;
