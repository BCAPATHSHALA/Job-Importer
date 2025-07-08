import { Queue } from "bullmq";
import connectionRedis from "../config/redis";

// Export BullMQ queue instance
export const jobQueue = new Queue("job-import", {
  connection: connectionRedis,
});
