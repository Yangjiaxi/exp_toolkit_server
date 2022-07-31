import mongoose from "mongoose";
import { dbURI } from "../configs/const";
import { logger } from "../utils/logger";
import { forEachAsync } from "../utils/forEachAsync";
import { CounterRepo } from "./CounterRepo";

const { connect } = mongoose;

connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
  .then(() => logger.info("Connected to MongoDB"))
  .catch(err => logger.error(err.message));

export { ProjectRepo } from "./ProjectRepo";
export { ExperimentRepo } from "./ExperimentRepo";
export { CounterRepo } from "./CounterRepo";
export { RecordRepo } from "./RecoreRepo";
export { UserRepo } from "./UserRepo";

const defaultSchema = [
  { key: "proj", value: 0 },
  { key: "exp", value: 0 },
  { key: "user", value: 0 },
];

export const initStatRepo = async () => {
  await forEachAsync(defaultSchema, async ({ key, value }) => {
    const record = (await CounterRepo.query({ key }))[0];
    if (!record) {
      await CounterRepo.createAndInsert({ key, value });
      logger.info(`Create Stat field \`${key}\` of \`{${value}}\``);
    } else {
      logger.info(`Stat field \`${key}\` already exist!`);
    }
  });
};

export const checkID = id => mongoose.Types.ObjectId.isValid(id);
