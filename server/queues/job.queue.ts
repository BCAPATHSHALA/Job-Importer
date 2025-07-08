import { Queue } from "bullmq";
import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Create a new Redis connection using separate values
const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

connection.on("connect", () => console.log("Redis connected successfully"));
connection.on("error", (err) => console.error("Redis connection error", err));

// Export BullMQ queue instance
export const jobQueue = new Queue("job-import", { connection });
