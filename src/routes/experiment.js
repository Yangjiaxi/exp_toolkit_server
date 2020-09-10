import { Router } from "express";

import { deleteExpRow, getExpInfo, sumbitExpData } from "../actions/experiment";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.use(jwtChecker);

// 获得一个实验的信息
router.get("/info/:expID", getExpInfo);

// 删除一个实验行
router.delete("/delete/:expID", deleteExpRow);

// 在运行端提交数据
router.post("/submit", sumbitExpData);

// 从回收站回复
// router.get("/restore/:expID", restoreFromTrash);

// 销毁项目
// router.delete("/destroy/:expID", deleteForever);

export const experiment = router;
