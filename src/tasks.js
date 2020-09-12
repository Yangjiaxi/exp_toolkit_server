import { logger } from "./utils/logger";
import { initStatRepo } from "./database";

const begin = async () => { 
  
};

export const tasks = async () => {
  await initStatRepo();
  logger.info("[T] Task loaded.");
};
