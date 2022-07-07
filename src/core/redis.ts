import Redis from "ioredis";

// Create Redis Client
export const RedisClient = process.env.REDIS_HOST
  ? new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    })
  : undefined;
