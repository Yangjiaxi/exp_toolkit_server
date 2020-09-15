import express from "express";
import { project } from "./project";
import { experiment } from "./experiment";
import { user } from "./user";

export const app = express();

app.use("/user", user);

app.use("/proj", project);

app.use("/exp", experiment);

export const routes = app;
