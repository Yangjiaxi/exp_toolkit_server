import { Router } from "express";

import {
  getAllProject,
  getDeletedProject,
  moveToTrash,
  getProjectInfo,
  createProject,
} from "../actions/project";

import { jwtChecker } from "../middlewares/authorization";

const router = Router();

router.use(jwtChecker);

// 得到未删除的项目
router.get("/list/my", getAllProject);

// 查看删除的项目
router.get("/list/deleted", getDeletedProject);

// 获得一个项目的信息
router.get("/info/:projID", getProjectInfo);

// // 新建一个项目
router.post("/create", createProject);

// 移动到回收站
router.delete("/delete/:projID", moveToTrash);

// 从回收站回复
// router.get("/restore/:projID", restoreFromTrash);

// 销毁项目
// router.delete("/destroy/:projID", deleteForever);

export const project = router;
