import express from "express";
import http from "http";
// import https from "https";
// import fs from "fs";

import { jsonParser, urlencodedParser } from "./middlewares/bodyParser";
import { cors } from "./middlewares/cors";
import { infoLogger } from "./middlewares/infoLogger";
import { noMatch } from "./middlewares/noMatch";
import { errorHandler } from "./middlewares/errorHandler";

import { routes } from "./routes";
import { logger } from "./utils/logger";
import { tasks } from "./tasks";

const PORT = 5050;
const app = express();

app.use(jsonParser);

app.use(urlencodedParser);

app.use(cors);

app.use(infoLogger);

app.use(routes);

app.use(noMatch);

app.use(errorHandler);

// const server = https.createServer(
//   {
//     key: fs.readFileSync("keys/api-doc.key"),
//     cert: fs.readFileSync("keys/api-doc.pem"),
//   },
//   app,
// );

const server = http.createServer(app);

server.listen(PORT, tasks);

logger.info(`Server started, listening at port ${PORT}`);
