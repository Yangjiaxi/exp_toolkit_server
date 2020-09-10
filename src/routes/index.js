import express from "express";
import { project } from "./project";
import { experiment } from "./experiment";

export const app = express();

app.use("/proj", project);

app.use("/exp", experiment);

export const routes = app;
