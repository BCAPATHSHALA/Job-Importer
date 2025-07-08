import { createClient } from "redis";

export const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT!),
  },
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
      console.log("Connected to Redis");
    }
    await redisClient.set("foo", "bar");
    const result = await redisClient.get("foo");
    console.log(result);
    return redisClient;
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    process.exit(1);
  }
};
