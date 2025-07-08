import { Queue } from "bullmq";
import IORedis from "ioredis";

// Create a new Redis connection instance
const connection = new IORedis(process.env.REDIS_URL!);

// Create a new queue instance for the "job-import" queue
export const jobQueue = new Queue("job-import", { connection });
