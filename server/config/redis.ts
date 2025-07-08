import IORedis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Create a new Redis connection using separate values
const connectionRedis = new IORedis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || "6379"),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: null,
});

connectionRedis.on("connect", () =>
  console.log("Redis connected successfully")
);
connectionRedis.on("error", (err) =>
  console.error("Redis connection error", err)
);

export default connectionRedis;
